'use client';
import { Flex, Button } from '@chakra-ui/react';
import { PlusSquareIcon, CheckIcon } from '@chakra-ui/icons';
import Link from 'next/link';

export default function OperationButtons({ id }: { id: string }) {
  return (
    <Flex justifyContent="space-evenly" mt="3">
      <Link href={`${id}/add`} passHref>
        <Button colorScheme="teal">
          <PlusSquareIcon mr="1" />
          支払いを追加
        </Button>
      </Link>
      <Link href={`${id}/calc`} passHref>
        <Button colorScheme="blue">
          <CheckIcon mr="1" /> 現在の精算結果を表示
        </Button>
      </Link>
    </Flex>
  );
}
