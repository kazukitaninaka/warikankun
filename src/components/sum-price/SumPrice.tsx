'use client';

import { Text } from '@chakra-ui/react';
import { useGetSumPriceQuery } from '@generated/graphql';
import { formatNumberToJPY } from '@utils/index';

const SumPrice = ({ id }: { id: string }) => {
  const { isPending, isError, data } = useGetSumPriceQuery({
    eventId: id as string,
  });
  if (isError) {
    return <Text data-testid="errorText">データ取得に失敗しました。</Text>;
  }
  return (
    <Text data-testid="text">
      支払い総額：
      {!isPending && formatNumberToJPY(data!.event.sumPrice)}
    </Text>
  );
};

export default SumPrice;
