import { ApolloClient, InMemoryCache, split, HttpLink, ApolloLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { onError } from '@apollo/client/link/error';

// Error link to handle unauthorized errors globally
const errorLink = onError(({ networkError }) => {
  if (networkError && networkError.statusCode && [401, 403].includes(networkError.statusCode)) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
});

// Middleware to dynamically attach token
const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('accessToken');
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }));
  return forward(operation);
});

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_HTTP || 'http://localhost:4000/graphql',
});

const wsClient = createClient({
  url: import.meta.env.VITE_GRAPHQL_WS || 'ws://localhost:4000/graphql',
  connectionParams: async () => {
    const token = localStorage.getItem('accessToken');
    return {
      authToken: token,
    };
  },
  retryAttempts: 3,
  shouldRetry: () => true,
});

// Use the official Apollo GraphQLWsLink for subscriptions
const wsLink = new GraphQLWsLink(wsClient);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  ApolloLink.from([errorLink, authLink, httpLink]),
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
}); 