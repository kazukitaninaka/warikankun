import EventName from '@components/event-name/event-name-server';
import { Text, Box, Center, Spinner } from '@chakra-ui/react';
import { Suspense } from 'react';
import SumPrice from '@components/sum-price/sum-price-server';
import Share from './Share';
import AddFriend from './AddFriend';
import Payments from './Payments';
import OperationButtons from './OperationButtons';

export default async function EventServerComponent({ id }: { id: string }) {
  return (
    <>
      <EventName id={id} />
      <OperationButtons id={id} />
      <Box mt="8">
        <SumPrice id={id} />
      </Box>
      <Box mb="5">
        <Suspense
          fallback={
            <Center mt="3">
              <Spinner size="lg" />
            </Center>
          }
        >
          <Payments id={id} />
        </Suspense>
      </Box>
      <Share id={id} />
      <Box mt="5">
        <AddFriend />
      </Box>
    </>
  );
}
