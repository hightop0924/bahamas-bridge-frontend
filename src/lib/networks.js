import {
  ETH_BN_BRIDGE,
  BSC_XDAI_BRIDGE,
  ETH_BSC_BRIDGE,
  ETH_XDAI_BRIDGE,
  KOVAN_SOKOL_BRIDGE,
  nativeCurrencies,
  POA_XDAI_BRIDGE,
  ADDRESS_ZERO,
} from 'lib/constants';

export {
  ETH_BN_BRIDGE,
  BSC_XDAI_BRIDGE,
  ETH_BSC_BRIDGE,
  ETH_XDAI_BRIDGE,
  KOVAN_SOKOL_BRIDGE,
  POA_XDAI_BRIDGE,
};

const ETH_XDAI_BRIDGE_CONFIG = {
  label: 'eth⥊gc',
  homeChainId: 100,
  foreignChainId: 1,
  enableForeignCurrencyBridge: true,
  homeWrappedForeignCurrencyAddress:
    '0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1'.toLowerCase(),
  wrappedForeignCurrencyAddress:
    '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'.toLowerCase(),
  foreignMediatorAddress:
    '0x88ad09518695c6c3712AC10a214bE5109a655671'.toLowerCase(),
  homeMediatorAddress:
    '0xf6A78083ca3e2a662D6dd1703c939c8aCE2e268d'.toLowerCase(),
  foreignAmbAddress: '0x4C36d2919e407f0Cc2Ee3c993ccF8ac26d9CE64e'.toLowerCase(),
  homeAmbAddress: '0x75Df5AF045d91108662D8080fD1FEFAd6aA0bb59'.toLowerCase(),
  foreignGraphName: 'raid-guild/mainnet-bahamahbridge',
  homeGraphName: 'raid-guild/xdai-bahamahbridge',
  ambLiveMonitorPrefix: 'https://alm-xdai.herokuapp.com',
  claimDisabled: false,
  tokensClaimDisabled: [],
};

const BSC_XDAI_BRIDGE_CONFIG = {
  label: 'bsc⥊gc',
  homeChainId: 100,
  foreignChainId: 56,
  enableForeignCurrencyBridge: true,
  homeWrappedForeignCurrencyAddress:
    '0xCa8d20f3e0144a72C6B5d576e9Bd3Fd8557E2B04'.toLowerCase(),
  wrappedForeignCurrencyAddress:
    '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'.toLowerCase(),
  foreignMediatorAddress:
    '0xF0b456250DC9990662a6F25808cC74A6d1131Ea9'.toLowerCase(),
  homeMediatorAddress:
    '0x59447362798334d3485c64D1e4870Fde2DDC0d75'.toLowerCase(),
  foreignAmbAddress: '0x05185872898b6f94AA600177EF41B9334B1FA48B'.toLowerCase(),
  homeAmbAddress: '0x162E898bD0aacB578C8D5F8d6ca588c13d2A383F'.toLowerCase(),
  foreignGraphName: 'dan13ram/bsc-to-xdai-bahamahbridge',
  homeGraphName: 'dan13ram/xdai-to-bsc-bahamahbridge',
  ambLiveMonitorPrefix: 'https://alm-bsc-xdai.herokuapp.com',
  claimDisabled: false,
  tokensClaimDisabled: [
    '0xCa8d20f3e0144a72C6B5d576e9Bd3Fd8557E2B04'.toLowerCase(), // Wrapped BNB from BSC
  ],
};

const POA_XDAI_BRIDGE_CONFIG = {
  label: 'poa⥊gc',
  homeChainId: 100,
  foreignChainId: 99,
  enableForeignCurrencyBridge: true,
  homeWrappedForeignCurrencyAddress:
    '0x9fe3864F9Ae7cfb5668Dae90C0e20c4C3D437664'.toLowerCase(),
  wrappedForeignCurrencyAddress:
    '0xD2CFBCDbDF02c42951ad269dcfFa27c02151Cebd'.toLowerCase(),
  foreignMediatorAddress:
    '0x8134470b7CF6f57Faee2076adf8F7301fD5865a5'.toLowerCase(),
  homeMediatorAddress:
    '0x63be59CF177cA9bb317DE8C4aa965Ddda93CB9d7'.toLowerCase(),
  foreignAmbAddress: '0xB2218bdEbe8e90f80D04286772B0968ead666942'.toLowerCase(),
  homeAmbAddress: '0xc2d77d118326c33BBe36EbeAbf4F7ED6BC2dda5c'.toLowerCase(),
  foreignGraphName: 'dan13ram/poa-to-xdai-bahamahbridge',
  homeGraphName: 'dan13ram/xdai-to-poa-bahamahbridge',
  ambLiveMonitorPrefix: 'https://alm-poa-xdai.herokuapp.com',
  claimDisabled: false,
  tokensClaimDisabled: [],
};

const KOVAN_SOKOL_BRIDGE_CONFIG = {
  label: 'kovan⥊sokol',
  homeChainId: 77,
  foreignChainId: 42,
  enableForeignCurrencyBridge: true,
  homeWrappedForeignCurrencyAddress:
    '0x3D14493DF2B479E6BABE82Fc2373F91622bac025'.toLowerCase(),
  wrappedForeignCurrencyAddress:
    '0x89ded978ef13CDBb88c0a5A959B66B552cf3355a'.toLowerCase(),
  foreignMediatorAddress:
    '0xA960d095470f7509955d5402e36d9DB984B5C8E2'.toLowerCase(),
  homeMediatorAddress:
    '0x40CdfF886715A4012fAD0219D15C98bB149AeF0e'.toLowerCase(),
  foreignAmbAddress: '0xFe446bEF1DbF7AFE24E81e05BC8B271C1BA9a560'.toLowerCase(),
  homeAmbAddress: '0xFe446bEF1DbF7AFE24E81e05BC8B271C1BA9a560'.toLowerCase(),
  foreignGraphName: 'dan13ram/kovan-bahamahbridge',
  homeGraphName: 'dan13ram/sokol-bahamahbridge',
  ambLiveMonitorPrefix: 'https://alm-test-amb.herokuapp.com',
  claimDisabled: false,
  tokensClaimDisabled: [],
};

const ETH_BSC_BRIDGE_CONFIG = {
  label: 'eth⥊bsc',
  homeChainId: 56,
  foreignChainId: 1,
  enableForeignCurrencyBridge: true,
  homeWrappedForeignCurrencyAddress: null,
  wrappedForeignCurrencyAddress:
    '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'.toLowerCase(),
  foreignMediatorAddress:
    '0x69c707d975e8d883920003CC357E556a4732CD03'.toLowerCase(),
  homeMediatorAddress:
    '0xD83893F31AA1B6B9D97C9c70D3492fe38D24d218'.toLowerCase(),
  foreignAmbAddress: '0x07955be2967B655Cf52751fCE7ccC8c61EA594e2'.toLowerCase(),
  homeAmbAddress: '0x6943A218d58135793F1FE619414eD476C37ad65a'.toLowerCase(),
  foreignGraphName: 'dan13ram/mainnet-to-bsc-bahamahbridge',
  homeGraphName: 'dan13ram/bsc-to-mainnet-bahamahbridge',
  ambLiveMonitorPrefix: 'http://alm-bsc.herokuapp.com',
  claimDisabled: false,
  tokensClaimDisabled: [],
};

const ETH_BN_BRIDGE_CONFIG = {
  label: 'eth⥊bn',
  // TODO : chanage to mainnets
  homeChainId: 1619, 
  foreignChainId: 5,
  enableForeignCurrencyBridge: false,
  homeWrappedForeignCurrencyAddress: // Wrapped ETH on Home chain
    '0x213e08e1e012594Bf9ADd96D8925616E58075dcC'.toLowerCase(),
  // TODO : change to mainnet BN
  wrappedForeignCurrencyAddress: // Wrapped ETH on Foreign chain 
    '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'.toLowerCase(),
  foreignMediatorAddress:
    '0x1F8Fe51536188d2499e8AF0ababF8C8bD1d76f5E'.toLowerCase(),
  homeMediatorAddress: // Common mediator functionality to handle operations related to token bridge messages sent to AMB bridge.
    '0x36dFDD3ef0D1d9536f844763b19c18eD5944380D'.toLowerCase(),
  foreignAmbAddress: // Foreign AMB Contract Address
    '0x3442e21ce6E36FFaD91D9B53B22F58DdD0760Af2'.toLowerCase(), 
  homeAmbAddress: // Home AMB Contract Address
    '0xb02f515Eb656AB1bEa0b5E468289935ae53B24cE'.toLowerCase(),
  foreignGraphName: 'dan13ram/mainnet-to-bsc-bahamahbridge',
  homeGraphName: 'dan13ram/bsc-to-mainnet-bahamahbridge',
  ambLiveMonitorPrefix: 'http://alm-bsc.herokuapp.com',
  claimDisabled: false,
  tokensClaimDisabled: [],
}; 

const ENABLED_BRIDGES = process.env.REACT_APP_ENABLED_BRIDGES.split(' ').map(
  b => b.toLowerCase(),
);

const bridgeInfo = {
  [ETH_BN_BRIDGE]: ETH_BN_BRIDGE_CONFIG,
  [ETH_BSC_BRIDGE]: ETH_BSC_BRIDGE_CONFIG,
  [ETH_XDAI_BRIDGE]: ETH_XDAI_BRIDGE_CONFIG,
  [BSC_XDAI_BRIDGE]: BSC_XDAI_BRIDGE_CONFIG,
  [POA_XDAI_BRIDGE]: POA_XDAI_BRIDGE_CONFIG,
  [KOVAN_SOKOL_BRIDGE]: KOVAN_SOKOL_BRIDGE_CONFIG,
};

const getNetworkConfig = bridges => {
  console.log("Bridges:", bridges);
  if (bridges && bridges.length > 0 && bridgeInfo) {
    return bridges.reduce((t, b) => ({ ...t, [b]: bridgeInfo[b] }), {});
  }
  return bridgeInfo;
};

export const networks = getNetworkConfig(ENABLED_BRIDGES);

export const defaultTokens = {
  [ETH_XDAI_BRIDGE]: {
    1: {
      address: '0x6810e776880c02933d47db1b9fc05908e5386b96',
      chainId: 1,
      symbol: 'GNO',
      name: 'Gnosis Token',
    },
    100: {
      address: '0x9c58bacc331c9aa871afd802db6379a98e80cedb',
      chainId: 100,
      symbol: 'GNO',
      name: 'Gnosis Token from Ethereum',
    },
  },
  [KOVAN_SOKOL_BRIDGE]: {
    42: {
      address: '0xFD2df5dCe4c89B007A43CF88d8161dAf1A17C7AB',
      chainId: 42,
      symbol: 'STAKE',
      name: 'STAKE',
    },
    77: {
      address: '0x408ec1bb883da0ea0fb3c955ea6befcd05aa7c3a',
      chainId: 77,
      symbol: 'STAKE',
      name: 'STAKE on xDai',
    },
  },
  [BSC_XDAI_BRIDGE]: {
    56: {
      address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      chainId: 56,
      symbol: 'WBNB',
      name: 'Wrapped BNB',
    },
    100: {
      address: '0xCa8d20f3e0144a72C6B5d576e9Bd3Fd8557E2B04',
      chainId: 100,
      symbol: 'WBNB',
      name: 'Wrapped BNB on GC',
    },
  },
  [POA_XDAI_BRIDGE]: {
    99: nativeCurrencies[99],
    100: {
      address: '0x9fe3864F9Ae7cfb5668Dae90C0e20c4C3D437664',
      chainId: 100,
      symbol: 'WPOA',
      name: 'Wrapped POA from POA',
    },
  },
  [ETH_BSC_BRIDGE]: {
    56: {
      address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      chainId: 56,
      symbol: 'WBNB',
      name: 'Wrapped BNB',
    },
    1: {
      address: '0x47f29657fd9f76710452208e9b12d8e9745e595c',
      chainId: 1,
      symbol: 'WBNB',
      name: 'Wrapped BNB from BSC',
    },
  },
  // TODO : H2W - change to mainnet
  [ETH_BN_BRIDGE]: {
    1619: nativeCurrencies[1619],
    5: {
      address: '0x0Ba2B3884d0bFE1FcDf6b3E142b68DC36e022Cc7',
      chainId: 5,
      symbol: 'WBN',
      name: 'Wrapped BN from BN',
    },
  },
};
