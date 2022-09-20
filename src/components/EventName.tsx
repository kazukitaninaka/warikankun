import { Text } from '@chakra-ui/react';
import { useGetEventNameQuery } from '@generated/graphql';

const EventName = ({ id }: { id: string | string[] | undefined }) => {
  const { isError, data } = useGetEventNameQuery({ eventId: id as string });
  if (isError) {
    return <Text>データ取得に失敗しました。</Text>;
  }
  return <Text fontSize="large">イベント名：{data?.event.name}</Text>;
};

export default EventName;
