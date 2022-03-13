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
        <LiffProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </LiffProvider>
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default MyApp;
