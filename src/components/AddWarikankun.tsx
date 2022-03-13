import { Box, Text, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

const AddWarikankun = () => {
  const router = useRouter();
  return (
    <Box>
      <Text mb="3" fontSize="sm">
        割り勘くんと友達になって、
        <br />
        新規割り勘イベントを作成しよう！
      </Text>
      <Button onClick={() => router.push('https://lin.ee/Tkc57gX')}>
        割り勘くんと友達になる
      </Button>
    </Box>
  );
};

export default AddWarikankun;
