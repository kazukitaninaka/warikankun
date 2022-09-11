import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '../components/Layout';
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
} from '@apollo/client';
import LiffProvider from '../components/LiffProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
      headers: {
        'x-hasura-admin-secret': process.env.NEXT_PUBLIC_X_HASURA_ADMIN_SECRET,
      },
    }),
    cache: new InMemoryCache(),
  });
  return (
    <ChakraProvider>
      <ApolloProvider client={client}>
        <QueryClientProvider client={queryClient}>
          <LiffProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </LiffProvider>
        </QueryClientProvider>
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default MyApp;
