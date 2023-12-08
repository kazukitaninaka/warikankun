import EventName from '@components/event-name/event-name-server';
import { Text, Box, Center } from '@chakra-ui/react';
import Calculating from './Calculating';
import { Suspense } from 'react';
import SumPrice from '@components/sum-price/sum-price-server';
import Calculate from './Calculate';

export default async function CalculateServerComponent({ id }: { id: string }) {
  return (
    <>
      <EventName id={id} />
      <Text textAlign="center" fontSize="2xl" mb="5">
        精算
      </Text>
      <Box mb="2">
        <SumPrice id={id} />
      </Box>
      <Suspense
        fallback={
          <Center>
            <Calculating />
          </Center>
        }
      >
        <Calculate id={id} />
      </Suspense>
    </>
  );
}
