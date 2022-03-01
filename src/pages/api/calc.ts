// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  from: {
    id: number;
    name: string;
  };
  to: {
    id: number;
    name: string;
  };
  amount: number;
}[];

type FetchEventResponse = {
  events: {
    id: string;
    name: string;
    payments: {
      id: number;
      name: string;
      amount: number;
      whoShouldPay: {
        participantId: number;
      }[];
      whoPaid: {
        id: number;
        name: string;
      };
    }[];
    participants: {
      id: number;
      name: string;
    }[];
  }[];
};

const fetchEventForCalc = async (
  eventId: string,
): Promise<FetchEventResponse> => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_GRAPHQL_REST_ENDPOINT}/${eventId}`,
    {
      headers: {
        'x-hasura-admin-secret': process.env.NEXT_PUBLIC_X_HASURA_ADMIN_SECRET!,
      },
    },
  );
  return await data.json();
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const eventId = req.body.input;
  const { events } = await fetchEventForCalc(eventId);
  const event = events[0];

  // TODO: 割り勘ロジックを作ってresultで返す

  const result = [
    {
      from: {
        id: 1,
        name: 'hoge',
      },
      to: {
        id: 2,
        name: 'fuga',
      },
      amount: 2000,
    },
  ];
  res.status(200).json(result);
}
