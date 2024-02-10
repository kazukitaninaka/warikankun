'use client';

import { Box, Center, Button, Text } from '@chakra-ui/react';
import { LiffContext } from '@components/LiffProvider';
import { useGetResultQuery } from '@generated/graphql';
import { makeRefundString } from '@utils/index';
import { useContext } from 'react';
import Image from 'next/image';

const Calculate = ({ id }: { id: string }) => {
  const { data } = useGetResultQuery({
    eventId: id,
  });
  const liff = useContext(LiffContext);
  const result = data?.result;

  const handleShareResultClick = () => {
    if (!liff?.isInClient() || !result) return;
    if (liff.isApiAvailable('shareTargetPicker')) {
      const refundString = makeRefundString(result.transactions);
      liff
        .shareTargetPicker([
          {
            type: 'text',
            text:
              `${result.name}の精算結果\n\n` +
              '🌟合計金額\n' +
              `　${result.sumPrice}円\n\n` +
              '🌟精算結果\n' +
              refundString +
              '支払い詳細は以下のリンクから確認できます\n' +
              `https://liff.line.me/${process.env.NEXT_PUBLIC_LIFF_ID}/event/${result.id}\n` +
              '---------------\n' +
              '「割り勘くん」',
          },
        ])
        .then(() => {
          liff.closeWindow();
        });
    }
  };

  return (
    <>
      <Box mb="10">
        {result?.transactions.map((transaction, index) => {
          return (
            <div key={`transaction-${index}`}>
              <Box bgColor="gray.100">
                <Text p="1.5">{transaction.from.name}</Text>
              </Box>
              <Box my="2" pl="1">
                {transaction.to.length === 0 ? (
                  <Text>精算なし</Text>
                ) : (
                  transaction.to.map((el) => (
                    <Text key={el.participantId}>
                      {el.name}に{el.amount}円
                    </Text>
                  ))
                )}
              </Box>
            </div>
          );
        })}
      </Box>
      <Center>
        <Button
          colorScheme="green"
          onClick={handleShareResultClick}
          disabled={!liff?.isInClient()}
          leftIcon={
            <Image src="/icons/share.svg" alt="" width="18" height="18" />
          }
        >
          <Box as="span">精算結果をグループに共有</Box>
        </Button>
      </Center>
    </>
  );
};

export default Calculate;
