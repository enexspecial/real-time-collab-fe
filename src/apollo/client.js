import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_HTTP || 'http://localhost:4000/graphql',
  headers: {
    authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '',
  },
});

const wsClient = createClient({
  url: import.meta.env.VITE_GRAPHQL_WS || 'ws://localhost:4000/graphql',
  connectionParams: {
    authToken: localStorage.getItem('token'),
  },
  retryAttempts: 3,
  shouldRetry: () => true,
});

const wsLink = {
  request: (operation, forward) => {
    return new Promise((resolve, reject) => {
      const unsubscribe = wsClient.subscribe(operation, {
        next: (data) => {
          resolve(data);
          unsubscribe();
        },
        error: (err) => {
          reject(err);
          unsubscribe();
        },
        complete: () => {
          unsubscribe();
        },
      });
    });
  },
};

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
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