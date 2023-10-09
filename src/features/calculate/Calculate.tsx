'use client';

import { Box, Center, Button, Text } from '@chakra-ui/react';
import { faShareSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Calculating from '@features/calculate/Calculating';
import EventName from '@components/EventName';
import { LiffContext } from '@components/LiffProvider';
import SumPrice from '@components/SumPrice';
import { useGetResultQuery } from '@generated/graphql';
import { makeRefundString } from '@utils/index';
import { Suspense, useContext } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const Calculate: React.FC<{ id: string }> = ({ id }) => {
  return (
    <>
      <EventName id={id} />
      <Text textAlign="center" fontSize="2xl" mb="5">
        精算
      </Text>
      <Box mb="2">
        <SumPrice id={id} />
      </Box>
      <ErrorBoundary
        fallback={<Text fontSize="lg">データ取得に失敗しました。</Text>}
      >
        <Suspense
          fallback={
            <Center>
              <Calculating />
            </Center>
          }
        >
          <Result id={id} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

const Result = ({ id }: { id: string }) => {
  const { data } = useGetResultQuery(
    {
      eventId: id,
    },
    {
      suspense: true,
    },
  );
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
        >
          <Box mr="1">
            <FontAwesomeIcon icon={faShareSquare} />
          </Box>
          精算結果をグループに共有
        </Button>
      </Center>
    </>
  );
};

export default Calculate;
