import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '../components/Layout';
import LiffProvider from '../components/LiffProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <LiffProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </LiffProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
