import Calculate from '@features/calculate/calculate-server';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { useGetResultQuery } from '@generated/graphql';

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
    queryKey: useGetResultQuery.getKey({ eventId: params.id }),
    queryFn: useGetResultQuery.fetcher({ eventId: params.id }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Calculate id={params.id} />
    </HydrationBoundary>
  );
};

export default Add;
