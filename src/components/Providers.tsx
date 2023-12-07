'use client';

import { useState } from 'react';
import { ChakraBaseProvider, extendBaseTheme } from '@chakra-ui/react';
import {
  Button,
  Input,
  Heading,
  Table,
  Checkbox,
  Popover,
  Select,
  Spinner,
  Modal,
  FormLabel,
} from '@chakra-ui/theme/components';
import { CacheProvider } from '@chakra-ui/next-js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LiffProvider from './LiffProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const theme = extendBaseTheme({
  components: {
    Button,
    Input,
    Heading,
    Table,
    Checkbox,
    Popover,
    Select,
    Spinner,
    Modal,
    FormLabel,
  },
});

const Providers = ({ children }: { children: React.ReactNode }) => {
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
          <LiffProvider>{children}</LiffProvider>
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
      </ChakraBaseProvider>
    </CacheProvider>
  );
};

export default Providers;
