import React from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box maxW="1000px" h="max" mx="auto">
      <Flex direction="column" minH="100vh">
        <header>
          <Box p={3}>
            <Heading as="h1">割り勘くん💸</Heading>
          </Box>
        </header>
        <Box flex="1" p={3}>
          <main>{children}</main>
        </Box>
      </Flex>
    </Box>
  );
};

export default Layout;
