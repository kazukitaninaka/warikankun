import { useEffect, useState } from 'react';
import { QueryParticipantsQuery } from '../generated/graphql';

type Details = {
  id: number;
  name: string;
  shouldPay: boolean;
  ratio: number;
}[];

export const ratioEnum = {
  LITTLE_LESS: 0.75,
  DEFAULT: 1,
  LITTLE_MORE: 1.25,
};

const useAddPaymentDetails = (
  event: QueryParticipantsQuery['events'][number] | undefined,
) => {
  const [details, setDetails] = useState<Details>([]);

  useEffect(() => {
    if (!event) return;
    const details = event.participants.map((participant) => {
      return {
        id: participant.id,
        name: participant.name,
        shouldPay: true,
        ratio: ratioEnum.DEFAULT,
      };
    });
    setDetails(details);
  }, [event]);

  return { details, setDetails };
};

export default useAddPaymentDetails;
