import React, { Suspense, useState } from 'react';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraBaseProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { theme } from '@components/Providers';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000, // マウント後の再取得を避ける
          },
        },
      }),
  );

  return (
    <CacheProvider>
      <ChakraBaseProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Suspense>{children}</Suspense>
        </QueryClientProvider>
      </ChakraBaseProvider>
    </CacheProvider>
  );
};
