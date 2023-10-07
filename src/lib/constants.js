import { BigNumber } from 'ethers';

export const ETH_XDAI_BRIDGE = 'eth-xdai';
export const BSC_XDAI_BRIDGE = 'bsc-xdai';
export const POA_XDAI_BRIDGE = 'poa-xdai';
export const KOVAN_SOKOL_BRIDGE = 'kovan-sokol';
export const ETH_BSC_BRIDGE = 'eth-bsc';
export const ETH_BN_BRIDGE = 'eth-bn';

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';
export const ETHER_CURRENCY_LOGO =
  'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png';
export const BNB_CURRENCY_LOGO =
  'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png';
export const POA_CURRENCY_LOGO =
  'https://s2.coinmarketcap.com/static/img/coins/64x64/2548.png';
export const BN_CURRENCY_LOGO =
  'https://s2.coinmarketcap.com/static/img/coins/64x64/2548.png';

export const LARGEST_UINT256 = BigNumber.from(
  '115792089237316195423570985008687907853269984665640564039457584007913129639935',
);

export const OWLRACLE_API_KEY = process.env.REACT_APP_OWLRACLE_API_KEY;

export const POLLING_INTERVAL =
  process.env.REACT_APP_UI_STATUS_UPDATE_INTERVAL || 5000;

export const DEFAULT_BRIDGE_DIRECTION =
  process.env.REACT_APP_DEFAULT_BRIDGE_DIRECTION || ETH_BN_BRIDGE;

export const COINZILLA_API_KEY =
  process.env.REACT_APP_COINZILLA_API_KEY || null;

export const NON_ETH_CHAIN_IDS = [56, 77, 99, 100];

export const XDAI_CHAIN_IDS = [77, 99, 100];

export const nativeCurrencies = {
  1: {
    chainId: 1,
    decimals: 18,
    logoURI: ETHER_CURRENCY_LOGO,
    address: ADDRESS_ZERO,
    name: 'Ether',
    symbol: 'ETH',
    mode: 'NATIVE',
  },
  5: {
    chainId: 5,
    decimals: 18,
    logoURI: ETHER_CURRENCY_LOGO,
    address: ADDRESS_ZERO,
    name: 'Ether',
    symbol: 'ETH',
    mode: 'NATIVE',
  },
  42: {
    chainId: 42,
    decimals: 18,
    logoURI: ETHER_CURRENCY_LOGO,
    address: ADDRESS_ZERO,
    name: 'Kovan Ether',
    symbol: 'KETH',
    mode: 'NATIVE',
  },
  56: {
    chainId: 56,
    decimals: 18,
    logoURI: BNB_CURRENCY_LOGO,
    name: 'Binance Coin',
    address: ADDRESS_ZERO,
    symbol: 'BNB',
    mode: 'NATIVE',
  },
  99: {
    chainId: 99,
    decimals: 18,
    logoURI: POA_CURRENCY_LOGO,
    name: 'POA',
    address: ADDRESS_ZERO,
    symbol: 'POA',
    mode: 'NATIVE',
  },
  // TODO : H2W - change to mainnet
  1619: {
    chainId: 1619,
    decimals: 18,
    logoURI: POA_CURRENCY_LOGO,
    name: 'Bahamas Coin',
    address: ADDRESS_ZERO,
    symbol: 'BN',
    mode: 'NATIVE',
  },
};

export const nativeCurrencyMediators = {
  1: '0xa6439ca0fcba1d0f80df0be6a17220fed9c9038a'.toLowerCase(),
  42: '0x227a6f13aa0dba8912d740c0f88fb1304b2597e1'.toLowerCase(),
  56: '0xefc33f8b2c4d51005585962be7ea20518ea9fd0d'.toLowerCase(),
  99: '0xF6a1Ad94d29679388e533B63bfE1Fd6f1680D23B'.toLowerCase(),
  // TODO : H2W - modify WETH Router Address
  1619: '0xE623a0b79ED7EE49B8d931e6145B4c587ca0679b'.toLowerCase(),
  35: ''.toLowerCase()
};

export const networkNames = {
  1: 'ETH Mainnet',
  3: 'Ropsten Testnet',
  4: 'Rinkeby Testnet',
  5: 'Goerli Testnet',
  42: 'Kovan Testnet',
  56: 'Binance Smart Chain',
  77: 'Sokol Testnet',
  99: 'POA Network',
  100: 'Gnosis Chain',
  // TODO : H2W - change to mainnet
  1619: 'Bahamas Testnet',
};

export const networkLabels = {
  1: 'Mainnet',
  3: 'Ropsten',
  4: 'Rinkeby',
  5: 'Gorli',
  42: 'Kovan',
  56: 'BSC',
  77: 'Sokol',
  99: 'POA',
  100: 'Gnosis Chain',
  // TODO : H2W - change to mainnet
  1619: 'Bahamas Testnet',
};

export const networkCurrencies = {
  1: {
    name: 'Ethereum',
    symbol: 'ETH',
  },
  42: {
    name: 'Ethereum',
    symbol: 'ETH',
  },
  56: {
    name: 'Binance Coin',
    symbol: 'BNB',
  },
  5: {
    name: 'Ethereum',
    symbol: 'ETH',
  },
  77: {
    name: 'Sokol POA',
    symbol: 'SPOA',
  },
  99: {
    name: 'POA',
    symbol: 'POA',
  },
  100: {
    name: 'xDai',
    symbol: 'xDai',
  },
  // TODO : H2W - change to mainnet
  1619: {
    name: 'Bahamas',
    symbol: 'BN',
  },
};

const {
  REACT_APP_MAINNET_RPC_URL,
  REACT_APP_XDAI_RPC_URL,
  REACT_APP_POA_RPC_URL,
  REACT_APP_SOKOL_RPC_URL,
  REACT_APP_KOVAN_RPC_URL,
  REACT_APP_BSC_RPC_URL,
  REACT_APP_BN_RPC_URL,
  REACT_APP_GOERLI_RPC_URL
} = process.env;

export const chainUrls = {
  1: {
    rpc: REACT_APP_MAINNET_RPC_URL.split(' '),
    explorer: 'https://blockscout.com/eth/mainnet',
    chainId: 1,
    name: networkNames[1],
  },
  42: {
    rpc: REACT_APP_KOVAN_RPC_URL.split(' '),
    explorer: 'https://blockscout.com/eth/kovan',
    chainId: 42,
    name: networkNames[42],
  },
  56: {
    rpc: REACT_APP_BSC_RPC_URL.split(' '),
    explorer: 'https://bscscan.com',
    chainId: 56,
    name: networkNames[56],
  },
  // TODO : change to mainnet rpc
  1619: {
    rpc: REACT_APP_BN_RPC_URL.split(' '),
    explorer: 'https://testnet-explorer.bahamaschain.io',
    chainId: 56,
    name: networkNames[56],
  },
  77: {
    rpc: REACT_APP_SOKOL_RPC_URL.split(' '),
    explorer: 'https://blockscout.com/poa/sokol',
    chainId: 77,
    name: networkNames[77],
  },
  99: {
    rpc: REACT_APP_POA_RPC_URL.split(' '),
    explorer: 'https://blockscout.com/poa/core',
    chainId: 99,
    name: networkNames[99],
  },
  100: {
    rpc: REACT_APP_XDAI_RPC_URL.split(' '),
    explorer: 'https://blockscout.com/xdai/mainnet',
    chainId: 100,
    name: networkNames[100],
  },
  5: {
    rpc: REACT_APP_GOERLI_RPC_URL.split(' '),
    explorer: 'https://goerli.etherscan.io/',
    chainId: 5,
    name: networkNames[5],
  },
};

export const defaultTokensUrl = {
  100: 'https://tokens.honeyswap.org',
  1: 'https://tokens.uniswap.org',
  42: '',
  77: '',
  99: '',
  56: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/tokenlist.json',
  // TODO : H2W - change to mainnet
  1619: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/tokenlist.json',
};

export const GRAPH_HEALTH_ENDPOINT =
  'https://api.thegraph.com/index-node/graphql';

export const LOCAL_STORAGE_KEYS = {
  DONT_SHOW_CLAIMS: 'dont-show-claims',
  MAINNET_RPC_URL: 'mainnet-rpc-url',
  GOERLI_RPC_URL: 'goerli-rpc-url',
  XDAI_RPC_URL: 'xdai-rpc-url',
  POA_RPC_URL: 'poa-rpc-url',
  BSC_RPC_URL: 'bsc-rpc-url',
  BN_RPC_URL: 'bn-rpc-url',
  KOVAN_RPC_URL: 'kovan-rpc-url',
  SOKOL_RPC_URL: 'sokol-rpc-url',
  NEVER_SHOW_CLAIMS: 'never-show-claims',
  INFINITE_UNLOCK: 'infinite-unlock',
  CUSTOM_TOKENS: 'customTokens',
  DISABLE_BALANCE_WHILE_TOKEN_FETCH: 'disable-balance-while-token-fetch',
  BRIDGE_DIRECTION: 'bridge-direction',
};

export const SENTRY_DSN = process.env.REACT_APP_SENTRY_DSN;
