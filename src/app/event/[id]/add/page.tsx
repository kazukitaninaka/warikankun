import AddComponent from '@features/event/add/add-server';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { useGetParticipantsQuery } from '@generated/graphql';

const Add = async ({
  params,
}: {
  params: {
    id: string | string[] | undefined;
  };
}) => {
  if (typeof params.id !== 'string') return <></>;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: useGetParticipantsQuery.getKey({ eventId: params.id }),
    queryFn: useGetParticipantsQuery.fetcher({ eventId: params.id }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AddComponent id={params.id} />
    </HydrationBoundary>
  );
};

export default Add;
