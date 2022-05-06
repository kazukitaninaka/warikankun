import { useEffect, useState } from 'react';
import { QueryParticipantsQuery } from '../generated/graphql';

type Details = {
  id: number;
  name: string;
  amount: string;
}[];

const useAddPaymentDetails = (
  event: QueryParticipantsQuery['events'][number] | undefined,
) => {
  const [details, setDetails] = useState<Details>([]);

  useEffect(() => {
    if (!event) return;
    const details = event.participants.map((participant) => {
      return { id: participant.id, name: participant.name, amount: '' };
    });
    setDetails(details);
  }, [event]);

  return { details, setDetails };
};

export default useAddPaymentDetails;
