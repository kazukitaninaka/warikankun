import { Text } from '@chakra-ui/react';
import { useQueryEventNameQuery } from '../generated/graphql';

const EventName = ({ id }: { id: string | string[] | undefined }) => {
  const { error, data } = useQueryEventNameQuery({
    variables: { eventId: id },
  });
  if (error) {
    <Text>データ取得に失敗しました。</Text>;
  }
  return <Text fontSize="large">イベント名：{data?.events[0].name}</Text>;
};

export default EventName;
