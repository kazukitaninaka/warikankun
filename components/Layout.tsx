import React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box maxW="1000px" mx="auto" bg="gray.50">
      <Flex direction="column" minH="100vh">
        <header>
          <Box p={3}>
            <Heading as="h1">割り勘くん💸</Heading>
          </Box>
        </header>
        <Box flex="1">
          <main>{children}</main>
        </Box>
        <footer>
          <Text>Footer</Text>
        </footer>
      </Flex>
    </Box>
  );
};

export default Layout;
