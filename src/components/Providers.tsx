'use client';

import { ChakraBaseProvider, extendBaseTheme } from '@chakra-ui/react';
import { Button, Input, Heading, Table } from '@chakra-ui/theme/components';
import { CacheProvider } from '@chakra-ui/next-js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LiffProvider from './LiffProvider';

const theme = extendBaseTheme({
  components: {
    Button,
    Input,
    Heading,
    Table,
  },
});

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <CacheProvider>
      <ChakraBaseProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <LiffProvider>{children}</LiffProvider>
        </QueryClientProvider>
      </ChakraBaseProvider>
    </CacheProvider>
  );
};

export default Providers;
