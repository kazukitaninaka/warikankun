import React, { Suspense } from 'react';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraBaseProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { theme } from '@components/Providers';

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <CacheProvider>
    <ChakraBaseProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Suspense>{children}</Suspense>
      </QueryClientProvider>
    </ChakraBaseProvider>
  </CacheProvider>
);
