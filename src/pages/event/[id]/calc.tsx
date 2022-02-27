import { Box, Center, Spinner, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useQueryEventForCalcQuery } from '../../../generated/graphql';

const Calc = () => {
  const { loading, error, data } = useCalc();

  if (loading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  if (error) {
    return (
      <Text>エラーが発生しました。時間を置いて再度アクセスしてください。</Text>
    );
  }

  const event = data?.events[0];
  const sumPrice = event?.payments_aggregate.aggregate?.sum?.amount;

  return (
    <>
      <Text textAlign="center" fontSize="2xl" mb="5">
        精算
      </Text>
      {event?.participants.map((participant) => {
        return (
          <div key={participant.id}>
            <Box bgColor="gray.100">
              <Text p="1.5">
                {participant.name} (支払うべき合計金額：1000円)
              </Text>
            </Box>
            <Box>
              <Text></Text>
            </Box>
          </div>
        );
      })}
    </>
  );
};

export default Calc;

const useCalc = () => {
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, data } = useQueryEventForCalcQuery({
    variables: { eventId: id },
  });

  return { loading, error, data };
};
