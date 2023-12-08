'use client';

import { Center, Text, Button, Box } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import useFriendship from '@hooks/useFriendship';

const AddFriend = () => {
  const { isFriend } = useFriendship();
  if (!isFriend) return null;
  return (
    <Box>
      <Center>
        <Text mb="3" fontSize="sm">
          割り勘くんと友達になって、
          <br />
          新規割り勘イベントを作成しよう！
        </Text>
      </Center>
      <Center>
        <Link href={'https://lin.ee/Tkc57gX'} passHref>
          <Button>割り勘くんと友達になる</Button>
        </Link>
      </Center>
    </Box>
  );
};

export default AddFriend;
