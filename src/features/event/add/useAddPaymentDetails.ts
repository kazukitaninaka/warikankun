import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { GetParticipantsQuery } from '@generated/graphql';

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
  participants: GetParticipantsQuery['participants'] | undefined,
): { details: Details; setDetails: Dispatch<SetStateAction<Details>> } => {
  const [details, setDetails] = useState<Details>([]);

  useEffect(() => {
    if (!participants) return;
    const details = participants.map((participant) => {
      return {
        id: participant.id,
        name: participant.name,
        shouldPay: true,
        ratio: ratioEnum.DEFAULT,
      };
    });
    setDetails(details);
  }, [participants]);

  return { details, setDetails };
};

export default useAddPaymentDetails;
