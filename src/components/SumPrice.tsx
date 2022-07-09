import { Text } from '@chakra-ui/react';
import { useQuerySumPriceQuery } from '../generated/graphql';
import { formatNumberToJPY } from '../utils';

const SumPrice = ({ id }: { id: string | string[] | undefined }) => {
  const { loading, error, data } = useQuerySumPriceQuery({
    variables: { eventId: id },
  });
  if (error) {
    return <Text data-testid="errorText">データ取得に失敗しました。</Text>;
  }
  return (
    <Text data-testid="text">
      支払い総額：
      {!loading &&
        formatNumberToJPY(
          data?.events[0].payments_aggregate.aggregate?.sum?.amount!,
        )}
    </Text>
  );
};

export default SumPrice;
