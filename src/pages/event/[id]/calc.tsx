import { Box, Center, Button, Spinner, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useResultQuery, To, From } from '../../../generated/graphql';
import useLiff from '../../../hooks/useLiff';
import { formatNumberToJPY } from '../../../utils';

type TransactionInCalc = {
  from: From;
  to: (Omit<To, 'id'> & {
    participantId: number;
  })[];
};

const Calc = () => {
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, data } = useResultQuery({
    variables: { eventId: id },
  });
  const { liff } = useLiff();

  if (loading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  if (error) {
    console.log(error);
    return (
      <Text>エラーが発生しました。時間を置いて再度アクセスしてください。</Text>
    );
  }

  const result = data?.QueryResult;

  const makeRefundString = (transactions: TransactionInCalc[]) => {
    let refundString = '';
    transactions.forEach((transaction) => {
      refundString += `${transaction.from.name} (支払うべき金額：
        ${transaction.from.shouldHavePaid}円)\n`;
      if (!transaction.to.length) {
        refundString += '　- 精算なし\n';
      } else {
        transaction.to.forEach((el) => {
          refundString += `　- ${el.name}へ${el.amount}円\n`;
        });
      }
    });
    refundString += '\n\n';

    return refundString;
  };

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
      <Text textAlign="center" fontSize="2xl" mb="5">
        精算
      </Text>
      <Text fontSize="large">イベント名：{result!.name}</Text>
      <Text my="2">支払い総額：{formatNumberToJPY(result!.sumPrice)}</Text>
      <Box mb="10">
        {result?.transactions.map((transaction, index) => {
          return (
            <div key={`transaction-${index}`}>
              <Box bgColor="gray.100">
                <Text p="1.5">
                  {transaction.from.name} (支払うべき合計金額：
                  {transaction.from.shouldHavePaid}円)
                </Text>
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
        <Button colorScheme="green" onClick={handleShareResultClick}>
          精算結果をグループに共有
        </Button>
      </Center>
    </>
  );
};

export default Calc;
