import EventName from '@components/event-name/event-name-server';
import Add from './Add';
import { Text } from '@chakra-ui/react';

export default async function AddServerComponent({ id }: { id: string }) {
  return (
    <>
      <EventName id={id} />
      <Text textAlign="center" fontSize="x-large" mb="5">
        支払い追加
      </Text>
      <Add id={id} />
    </>
  );
}
