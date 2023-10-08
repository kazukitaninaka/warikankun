'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { CacheProvider } from '@chakra-ui/next-js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LiffProvider from './LiffProvider';

const queryClient = new QueryClient();
const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <CacheProvider>
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <LiffProvider>{children}</LiffProvider>
        </QueryClientProvider>
      </ChakraProvider>
    </CacheProvider>
  );
};

export default Providers;
