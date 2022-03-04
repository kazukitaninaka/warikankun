import { Box, Center, Spinner, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useQueryResultQuery } from '../../../generated/graphql';

const Calc = () => {
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, data } = useQueryResultQuery({
    variables: { eventId: id },
  });

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

  return (
    <>
      <Text textAlign="center" fontSize="2xl" mb="5">
        精算
      </Text>
      {result?.transactions.map((transaction, index) => {
        return (
          <div key={`transaction-${index}`}>
            <Box bgColor="gray.100">
              <Text p="1.5">
                {transaction.from.name} (支払うべき合計金額：
                {transaction.from.shouldHavePaid}円)
              </Text>
            </Box>
            <Box>
              {transaction.to.length === 0 ? (
                <Text>精算なし</Text>
              ) : (
                transaction.to.map((el) => (
                  <Text key={el.id}>
                    {el.name}に{el.amount}円
                  </Text>
                ))
              )}
            </Box>
          </div>
        );
      })}
    </>
  );
};

export default Calc;

type Data = {
  id: string;
  name: string;
  amount: number;
  participants: {
    id: number;
    name: string;
    paymentMessage: string;
  }[];
};

// const useCalc = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const { loading, error, data } = useQueryResultQuery({
//     variables: { eventId: id },
//   });

//   return { loading, error, data };
// };
