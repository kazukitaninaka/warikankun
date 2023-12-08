'use client';

import { Box, Text, Button } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import useFriendship from '@hooks/useFriendship';

const AddFriend = () => {
  const { isFriend } = useFriendship();
  if (!isFriend) return null;
  return (
    <Box>
      <Text mb="3" fontSize="sm">
        割り勘くんと友達になって、
        <br />
        新規割り勘イベントを作成しよう！
      </Text>
      <Link href={'https://lin.ee/Tkc57gX'} passHref>
        <Button>割り勘くんと友達になる</Button>
      </Link>
    </Box>
  );
};

export default AddFriend;
