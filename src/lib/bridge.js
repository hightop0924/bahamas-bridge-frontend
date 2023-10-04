import { BigNumber, Contract } from 'ethers';
import { ADDRESS_ZERO } from 'lib/constants';
import {
  getHelperContract,
  getMediatorAddressWithoutOverride,
  getNetworkLabel,
  logError,
} from 'lib/helpers';
import { networks } from 'lib/networks';
import { getOverriddenToToken, isOverridden } from 'lib/overrides';
import { getEthersProvider } from 'lib/providers';
import { fetchTokenDetails, fetchTokenName } from 'lib/token';

const getToName = async (fromToken, toChainId, toAddress) => {
  const { name } = fromToken;
  if (toAddress === ADDRESS_ZERO) {
    const fromName = name || (await fetchTokenName(fromToken));
    return `${fromName} on ${toChainId === 100 ? 'GC' : getNetworkLabel(toChainId)
      }`;
  }
  return fetchTokenName({ chainId: toChainId, address: toAddress });
};

const fetchToTokenDetails = async (bridgeDirection, fromToken, toChainId) => {
  const {
    chainId: fromChainId,
    address: fromAddress,
    mode: fromMode,
  } = fromToken;
  if (
    isOverridden(bridgeDirection, {
      address: fromAddress,
      chainId: fromChainId,
    })
  ) {
    return fetchTokenDetails(bridgeDirection, {
      address: getOverriddenToToken(bridgeDirection, {
        address: fromAddress,
        chainId: fromChainId,
      }),
      chainId: toChainId,
    });
  }

  const fromMediatorAddress = getMediatorAddressWithoutOverride(
    bridgeDirection,
    fromChainId,
  );
  const toMediatorAddress = getMediatorAddressWithoutOverride(
    bridgeDirection,
    toChainId,
  );

  if (fromAddress === ADDRESS_ZERO && fromMode === 'NATIVE') {
    const { enableForeignCurrencyBridge, homeWrappedForeignCurrencyAddress } =
      networks[bridgeDirection];
    if (!enableForeignCurrencyBridge)
      throw new Error(
        'Bridging native tokens is not supported in this direction',
      );

    return fetchTokenDetails(bridgeDirection, {
      address: homeWrappedForeignCurrencyAddress,
      chainId: toChainId,
    });
  }

  const fromEthersProvider = await getEthersProvider(fromChainId);
  const toEthersProvider = await getEthersProvider(toChainId);
  const abi = [
    'function isRegisteredAsNativeToken(address) view returns (bool)',
    'function bridgedTokenAddress(address) view returns (address)',
    'function nativeTokenAddress(address) view returns (address)',
  ];
  const fromMediatorContract = new Contract(
    fromMediatorAddress,
    abi,
    fromEthersProvider,
  );
  const isNativeToken = await fromMediatorContract.isRegisteredAsNativeToken(
    fromAddress,
  );

  if (isNativeToken) {
    const toMediatorContract = new Contract(
      toMediatorAddress,
      abi,
      toEthersProvider,
    );

    const toAddress = await toMediatorContract.bridgedTokenAddress(fromAddress);

    const toName = await getToName(fromToken, toChainId, toAddress);
    return {
      name: toName,
      chainId: toChainId,
      address: toAddress,
      mode: 'erc677',
      mediator: toMediatorAddress,
    };
  }
  const toAddress = await fromMediatorContract.nativeTokenAddress(fromAddress);

  const toName = await getToName(fromToken, toChainId, toAddress);
  return {
    name: toName,
    chainId: toChainId,
    address: toAddress,
    mode: 'erc20',
    mediator: toMediatorAddress,
  };
};

export const fetchToToken = async (bridgeDirection, fromToken, toChainId) => {
  const toToken = await fetchToTokenDetails(
    bridgeDirection,
    fromToken,
    toChainId,
  );
  return toToken;
};

export const fetchToAmount = async (
  bridgeDirection,
  feeType,
  fromToken,
  toToken,
  fromAmount,
  feeManagerAddress,
) => {
  if (fromAmount.lte(0) || !fromToken || !toToken) return BigNumber.from(0);
  const { homeChainId, homeMediatorAddress } = networks[bridgeDirection];

  const isHome = homeChainId === toToken.chainId;
  const tokenAddress = isHome ? toToken.address : fromToken.address;
  const mediatorAddress = isHome ? toToken.mediator : fromToken.mediator;

  if (fromToken.mode == "NATIVE" || toToken.mode == "NATIVE") {
    if (toToken.decimals - fromToken.decimals > 0)
      return fromAmount.mul(BigNumber.from(10).pow(toToken.decimals - fromToken.decimals));
    return fromAmount.div(BigNumber.from(10).pow(fromToken.decimals - toToken.decimals));
  }

  if (
    mediatorAddress !== homeMediatorAddress ||
    !tokenAddress ||
    !feeManagerAddress
  ) {
    return fromAmount;
  }

  try {
    const ethersProvider = await getEthersProvider(homeChainId);
    const abi = [
      'function calculateFee(bytes32, address, uint256) view returns (uint256)',
    ];
    const feeManagerContract = new Contract(
      feeManagerAddress,
      abi,
      ethersProvider,
    );

    const fee = await feeManagerContract.calculateFee(
      feeType,
      tokenAddress,
      fromAmount,
    );

    return fromAmount.sub(fee);
  } catch (amountError) {
    logError({ amountError });
    return fromAmount;
  }
};

const getDefaultTokenLimits = async (
  decimals,
  mediatorContract,
  toMediatorContract,
) => {
  let [minPerTx, maxPerTx, dailyLimit] = await Promise.all([
    mediatorContract.minPerTx(ADDRESS_ZERO),
    toMediatorContract.executionMaxPerTx(ADDRESS_ZERO),
    mediatorContract.executionDailyLimit(ADDRESS_ZERO),
  ]);

  if (decimals < 18) {
    const factor = BigNumber.from(10).pow(18 - decimals);

    minPerTx = minPerTx.div(factor);
    maxPerTx = maxPerTx.div(factor);
    dailyLimit = dailyLimit.div(factor);

    if (minPerTx.eq(0)) {
      minPerTx = BigNumber.from(1);
      if (maxPerTx.lte(minPerTx)) {
        maxPerTx = BigNumber.from(100);
        if (dailyLimit.lte(maxPerTx)) {
          dailyLimit = BigNumber.from(10000);
        }
      }
    }
  } else {
    const factor = BigNumber.from(10).pow(decimals - 18);

    minPerTx = minPerTx.mul(factor);
    maxPerTx = maxPerTx.mul(factor);
    dailyLimit = dailyLimit.mul(factor);
  }

  return {
    minPerTx,
    maxPerTx,
    remainingLimit: dailyLimit,
    dailyLimit,
  };
};

export const fetchTokenLimits = async (
  bridgeDirection,
  fromToken,
  toToken,
  currentDay,
) => {
  const isDedicatedMediatorToken =
    fromToken.mediator !==
    getMediatorAddressWithoutOverride(bridgeDirection, fromToken.chainId);

  const abi = isDedicatedMediatorToken
    ? [
      'function getCurrentDay() view returns (uint256)',
      'function minPerTx() view returns (uint256)',
      'function executionMaxPerTx() view returns (uint256)',
      'function dailyLimit() view returns (uint256)',
      'function totalSpentPerDay(uint256) view returns (uint256)',
      'function executionDailyLimit() view returns (uint256)',
      'function totalExecutedPerDay(uint256) view returns (uint256)',
    ]
    : [
      'function getCurrentDay() view returns (uint256)',
      'function minPerTx(address) view returns (uint256)',
      'function executionMaxPerTx(address) view returns (uint256)',
      'function dailyLimit(address) view returns (uint256)',
      'function totalSpentPerDay(address, uint256) view returns (uint256)',
      'function executionDailyLimit(address) view returns (uint256)',
      'function totalExecutedPerDay(address, uint256) view returns (uint256)',
    ];

  try {
    const fromMediatorContract = new Contract(
      fromToken.mediator,
      abi,
      await getEthersProvider(fromToken.chainId),
    );
    const toMediatorContract = new Contract(
      toToken.mediator,
      abi,
      await getEthersProvider(toToken.chainId),
    );

    const { wrappedForeignCurrencyAddress } = networks[bridgeDirection];

    const fromTokenAddress =
      fromToken.address === ADDRESS_ZERO && fromToken.mode === 'NATIVE'
        ? ADDRESS_ZERO
        : fromToken.address;
    const toTokenAddress =
      toToken.address === ADDRESS_ZERO && toToken.mode === 'NATIVE'
        ? ADDRESS_ZERO
        : toToken.address;

    if (toTokenAddress === ADDRESS_ZERO || fromTokenAddress === ADDRESS_ZERO)
      return getDefaultTokenLimits(
        fromToken.decimals,
        fromMediatorContract,
        toMediatorContract,
      );

    const [
      minPerTx,
      dailyLimit,
      totalSpentPerDay,
      maxPerTx,
      executionDailyLimit,
      totalExecutedPerDay,
    ] = isDedicatedMediatorToken
        ? await Promise.all([
          fromMediatorContract.minPerTx(),
          fromMediatorContract.dailyLimit(),
          fromMediatorContract.totalSpentPerDay(currentDay),
          toMediatorContract.executionMaxPerTx(),
          toMediatorContract.executionDailyLimit(),
          toMediatorContract.totalExecutedPerDay(currentDay),
        ])
        : await Promise.all([
          fromMediatorContract.minPerTx(fromTokenAddress),
          fromMediatorContract.dailyLimit(fromTokenAddress),
          fromMediatorContract.totalSpentPerDay(fromTokenAddress, currentDay),
          toMediatorContract.executionMaxPerTx(toTokenAddress),
          toMediatorContract.executionDailyLimit(toTokenAddress),
          toMediatorContract.totalExecutedPerDay(toTokenAddress, currentDay),
        ]);

    const remainingExecutionLimit =
      executionDailyLimit.sub(totalExecutedPerDay);
    const remainingRequestLimit = dailyLimit.sub(totalSpentPerDay);
    const remainingLimit = remainingRequestLimit.lt(remainingExecutionLimit)
      ? remainingRequestLimit
      : remainingExecutionLimit;

    // console.log(
    //   Object.fromEntries(
    //     Object.entries({
    //       minPerTx,
    //       dailyLimit,
    //       totalSpentPerDay,
    //       maxPerTx,
    //       executionDailyLimit,
    //       totalExecutedPerDay,
    //       remainingExecutionLimit,
    //       remainingRequestLimit,
    //       remainingLimit,
    //     }).map(([key, value]) => [key, value.toString()]),
    //   ),
    // );

    return {
      minPerTx,
      maxPerTx,
      remainingLimit,
      dailyLimit: dailyLimit.lt(executionDailyLimit)
        ? dailyLimit
        : executionDailyLimit,
    };
  } catch (error) {
    logError({ tokenLimitsError: error });
    return {
      minPerTx: BigNumber.from(0),
      maxPerTx: BigNumber.from(0),
      remainingLimit: BigNumber.from(0),
      dailyLimit: BigNumber.from(0),
    };
  }
};

export const relayTokens = async (
  ethersProvider,
  token,
  receiver,
  amount,
  { shouldReceiveNativeCur, foreignChainId },
  toToken
) => {
  const signer = ethersProvider.getSigner();
  const { mode, mediator, address, helperContractAddress } = token;
  switch (mode) {
    case 'NATIVE': {
      const abi = [
        'function wrapAndRelayTokens(address _receiver) public payable',
      ];
      if (!helperContractAddress || helperContractAddress == undefined) {
        helperContractAddress = getHelperContract(token.chainId);
      }
      const helperContract = new Contract(helperContractAddress, abi, signer);
      return helperContract.wrapAndRelayTokens(receiver, { value: amount });
    }
    case 'erc677': {
      const abi = ['function transferAndCall(address, uint256, bytes)'];
      const tokenContract = new Contract(address, abi, signer);
      const foreignHelperContract = getHelperContract(foreignChainId);
      const bytesData =
        shouldReceiveNativeCur && foreignHelperContract
          ? `${foreignHelperContract}${receiver.replace('0x', '')}`
          : receiver;
      return tokenContract.transferAndCall(mediator, amount, bytesData);
    }
    case 'dedicated-erc20': {
      const abi = ['function relayTokens(address, uint256)'];
      const mediatorContract = new Contract(mediator, abi, signer);
      return mediatorContract.relayTokens(receiver, amount);
    }
    case 'erc20':
    default: {
      if (toToken.mode == "NATIVE") {
        const abi = ['function relayTokensAndCall(address, address, uint256, bytes)'];
        const mediatorContract = new Contract(mediator, abi, signer);
        const foreignHelperContract = getHelperContract(toToken.chainId);
        const bytesData = `${receiver.replace('0x', '')}`;
        console.log("HHHHH relayTokens:", token.address, foreignHelperContract, amount, receiver);
        return mediatorContract.relayTokensAndCall(token.address, foreignHelperContract, amount, receiver);
      } 
      const abi = ['function relayTokens(address, address, uint256)'];
      const mediatorContract = new Contract(mediator, abi, signer);
      return mediatorContract.relayTokens(token.address, receiver, amount);
    }
  }
};
