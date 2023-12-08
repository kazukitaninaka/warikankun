import { useGetEventNameQuery } from '@generated/graphql';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import EventName from './EventName';

export default async function EventNameServerComponent({ id }: { id: string }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: useGetEventNameQuery.getKey({ eventId: id }),
    queryFn: useGetEventNameQuery.fetcher({ eventId: id }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EventName id={id} />
    </HydrationBoundary>
  );
}
