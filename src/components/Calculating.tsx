import { Text, Spinner, Flex } from '@chakra-ui/react';

const Calculating = () => {
  return (
    <Flex gap="5">
      <Spinner size="lg" />
      <Text fontSize="large">計算中...</Text>
    </Flex>
  );
};

export default Calculating;
