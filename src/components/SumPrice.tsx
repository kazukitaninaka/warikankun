import { Text } from '@chakra-ui/react';
import { useQuerySumPriceQuery } from '../generated/graphql';
import { formatNumberToJPY } from '../utils';

const SumPrice = ({ id }: { id: string | string[] | undefined }) => {
  const { loading, error, data } = useQuerySumPriceQuery({
    variables: { eventId: id },
  });
  if (error) {
    <Text>データ取得に失敗しました。</Text>;
  }
  return (
    <Text>
      支払い総額：
      {!loading &&
        formatNumberToJPY(
          data?.events[0].payments_aggregate.aggregate?.sum?.amount!,
        )}
    </Text>
  );
};

export default SumPrice;
