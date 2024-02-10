'use client';

import { Flex, Button } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

export default function OperationButtons({ id }: { id: string }) {
  return (
    <Flex justifyContent="space-evenly" mt="3">
      <Button
        as={Link}
        href={`${id}/add`}
        colorScheme="teal"
        leftIcon={<Image src="/icons/add.svg" alt="" width="18" height="18" />}
      >
        支払いを追加
      </Button>
      <Button
        as={Link}
        href={`${id}/calc`}
        colorScheme="blue"
        leftIcon={
          <Image src="/icons/check.svg" alt="" width="18" height="18" />
        }
      >
        精算結果を表示
      </Button>
    </Flex>
  );
}
