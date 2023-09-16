import schema from '@uniswap/token-lists/src/tokenlist.schema.json';
import Ajv from 'ajv';
import { gql, request } from 'graphql-request';

import { getTokenListUrl, logError, uniqueTokens } from './helpers';
import { renamexDaiTokensAsGnosis } from './token';

const tokenListValidator = new Ajv({ allErrors: true }).compile(schema);

const fetchDefaultTokens = async chainId => {
  try {
    const url = getTokenListUrl(chainId);
    if (url) {
      const response = await fetch(url);
      if (response.ok) {
        const json = await response.json();
        if (chainId === 56) {
          json.tokens = json.tokens.map(token => ({ ...token, chainId }));
        }
        if (tokenListValidator(json) || chainId === 56) {
          return json.tokens.filter(token => token.chainId === chainId);
        }
      }
    }
  } catch (defaultTokensError) {
    logError({ defaultTokensError });
  }
  return [];
};

const homeTokensQuery = gql`
  query homeTokens {
    tokens(where: { homeAddress_contains: "0x" }, first: 1000) {
      chainId: homeChainId
      address: homeAddress
      name: homeName
      symbol
      decimals
    }
  }
`;

const foreignTokensQuery = gql`
  query foreignTokens {
    tokens(where: { foreignAddress_contains: "0x" }, first: 1000) {
      chainId: foreignChainId
      address: foreignAddress
      name: foreignName
      symbol
      decimals
    }
  }
`;

const fetchTokensFromSubgraph = async (homeEndpoint, foreignEndpoint) => {
  try {
    const [homeData, foreignData] = await Promise.all([
      request(homeEndpoint, homeTokensQuery),
      request(foreignEndpoint, foreignTokensQuery),
    ]);
    const homeTokens = homeData && homeData.tokens ? homeData.tokens : [];
    const foreignTokens =
      foreignData && foreignData.tokens ? foreignData.tokens : [];
    return homeTokens.concat(foreignTokens);
  } catch (subgraphTokensError) {
    logError({ subgraphTokensError });
  }
  return [];
};

export function memoize(method) {
  const cache = {};

  return async function memoized(...args) {
    const argString = JSON.stringify(args);
    cache[argString] = cache[argString] || (await method(...args));
    return cache[argString];
  };
}

export const fetchTokenList = memoize(
  async (chainId, homeEndpoint, foreignEndpoint) => {
    const [defaultTokens, subgraphTokens] = await Promise.all([
      fetchDefaultTokens(chainId),
      fetchTokensFromSubgraph(homeEndpoint, foreignEndpoint),
    ]);
    const tokens = uniqueTokens(defaultTokens.concat(subgraphTokens));
    return tokens.map(token => ({
      ...token,
      name: renamexDaiTokensAsGnosis(token.name),
    }));
  },
);
