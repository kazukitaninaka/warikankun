import EventComponent from '@features/event/event-server';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { useGetEventNameQuery, useGetPaymentsQuery } from '@generated/graphql';

const Event = async ({
  params,
}: {
  params: {
    id: string | string[] | undefined;
  };
}) => {
  if (typeof params.id !== 'string') return <></>;

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: useGetEventNameQuery.getKey({ eventId: params.id }),
      queryFn: useGetEventNameQuery.fetcher({ eventId: params.id }),
    }),
    queryClient.prefetchQuery({
      queryKey: useGetPaymentsQuery.getKey({ eventId: params.id }),
      queryFn: useGetPaymentsQuery.fetcher({ eventId: params.id }),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EventComponent id={params.id} />
    </HydrationBoundary>
  );
};

export default Event;
