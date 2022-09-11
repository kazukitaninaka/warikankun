import { Text } from '@chakra-ui/react';
import { useGetSumPriceQuery } from '@generated/graphql';
import { formatNumberToJPY } from '../utils';

const SumPrice = ({ id }: { id: string | string[] | undefined }) => {
  const { isLoading, isError, data } = useGetSumPriceQuery({
    // TODO: asを消す
    eventId: id as string,
  });
  if (isError) {
    return <Text data-testid="errorText">データ取得に失敗しました。</Text>;
  }
  return (
    <Text data-testid="text">
      支払い総額：
      {!isLoading && formatNumberToJPY(data.event.sumPrice)}
    </Text>
  );
};

export default SumPrice;
