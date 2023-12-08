import { useGetSumPriceQuery } from '@generated/graphql';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import SumPrice from './SumPrice';

export default async function SumPriceServerComponent({ id }: { id: string }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: useGetSumPriceQuery.getKey({ eventId: id }),
    queryFn: useGetSumPriceQuery.fetcher({ eventId: id }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SumPrice id={id} />
    </HydrationBoundary>
  );
}
