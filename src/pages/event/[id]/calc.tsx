import { Box, Center, Button, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Calculating from '../../../components/Calculating';
import EventName from '../../../components/EventName';
import { liffVar } from '../../../components/LiffProvider';
import SumPrice from '../../../components/SumPrice';
import { useResultQuery } from '../../../generated/graphql';
import { makeRefundString } from '../../../utils';

const Calc = () => {
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, data } = useResultQuery({
    variables: { eventId: id },
  });
  const liff = liffVar();

  if (error) {
    return (
      <Text>エラーが発生しました。時間を置いて再度アクセスしてください。</Text>
    );
  }

  const result = data?.QueryResult;

  const handleShareResultClick = () => {
    if (!liff || !result) return;
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
      <EventName id={id} />
      <Text textAlign="center" fontSize="2xl" mb="5">
        精算
      </Text>
      <Box mb="2">
        <SumPrice id={id} />
      </Box>
      <Box mb="10">
        {loading ? (
          <Center>
            <Calculating />
          </Center>
        ) : (
          result?.transactions.map((transaction, index) => {
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
          })
        )}
      </Box>
      <Center>
        <Button colorScheme="green" onClick={handleShareResultClick}>
          精算結果をグループに共有
        </Button>
      </Center>
    </>
  );
};

export default Calc;
