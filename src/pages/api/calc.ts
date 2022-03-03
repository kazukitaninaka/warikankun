// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Transaction = {
  from: {
    id: number;
    name: string;
  };
  to: {
    id: number;
    name: string;
  };
  amount: number;
};

type FetchEventResponse = {
  events: Event[];
};

type Event = {
  id: string;
  name: string;
  payments: Payment[];
  participants: {
    id: number;
    name: string;
  }[];
};

type Payment = {
  id: number;
  name: string;
  amount: number;
  whoShouldPay: WhoShouldPay[];
  whoPaid: {
    id: number;
    name: string;
  };
};

type WhoShouldPay = {
  participantId: number;
};

type ParticipantBalance = {
  id: number;
  name: string;
  balance: number;
};

const fetchEventForCalc = async (
  eventId: string,
): Promise<FetchEventResponse> => {
  const data = await fetch(
    `https://warikankun.hasura.app/api/rest/eventForCalc/${eventId}`,
    {
      headers: {
        'x-hasura-admin-secret': process.env.NEXT_PUBLIC_X_HASURA_ADMIN_SECRET!,
      },
    },
  );

  return await data.json();
};

const sortByBalance = (arr: ParticipantBalance[]) => {};

const isInWhoShouldPay = (
  whoShouldPay: WhoShouldPay[],
  participantId: number,
): boolean => {
  return whoShouldPay.some((el) => el.participantId === participantId);
};

const calcBalance = (event: Event): ParticipantBalance[] => {
  let participantBalances = event.participants.map((participant) => ({
    id: participant.id,
    name: participant.name,
    balance: 0,
  }));

  event.payments.forEach((payment) => {
    // 支払った人は「支払ったトータル金額」ー「自分が払うべき金額」をプラス
    // whoShouldPayの人たちは「自分が払うべき金額」をマイナス
    const numParticipants = payment.whoShouldPay.length;
    const pricePerParticipant = Math.ceil(payment.amount / numParticipants); // 負担者が若干得するためにceil

    participantBalances = participantBalances.map((participantBalance) => {
      // もし払った人だったらbalanceに支払い分を追加
      if (participantBalance.id === payment.whoPaid.id) {
        // もしwhoShouldPayに支払った人が含まれているなら、支払った額から一人当たりの金額を引く
        const amount = isInWhoShouldPay(
          payment.whoShouldPay,
          participantBalance.id,
        )
          ? payment.amount - pricePerParticipant
          : payment.amount;
        return {
          ...participantBalance,
          balance: participantBalance.balance + amount,
        };
      }
      // もし払うべき人だったらdebtの分引く
      if (isInWhoShouldPay(payment.whoShouldPay, participantBalance.id)) {
        return {
          ...participantBalance,
          balance: participantBalance.balance - pricePerParticipant,
        };
      }
      // それ以外はそのままreturn
      return participantBalance;
    });
  });
  return participantBalances;
};

const resolveBlance = (participantBalances: ParticipantBalance[]) => {
  const transactions: Transaction[] = [];
  let _participantBalances = participantBalances;
  while (true) {
    // sort participantBalances by descending order
    _participantBalances.sort((a, b) => b.balance - a.balance);
    console.log(_participantBalances);

    const paidTooMuch = _participantBalances[0]; // 一番多めに払った人
    const paidLess = _participantBalances[_participantBalances.length - 1]; // 一番払っていない人
    console.log(paidTooMuch, paidLess);

    if (paidTooMuch.balance === 0 || paidLess.balance === 0) break;

    const transactionAmount = Math.min(
      paidTooMuch.balance,
      Math.abs(paidLess.balance),
    );

    transactions.push({
      from: { id: paidLess.id, name: paidLess.name },
      to: { id: paidTooMuch.id, name: paidTooMuch.name },
      amount: transactionAmount,
    });

    _participantBalances[0].balance -= transactionAmount;
    _participantBalances[_participantBalances.length - 1].balance +=
      transactionAmount;
  }
  return transactions;
};

const calcTransaction = (event: Event) => {
  // TODO: balanceがゼロサムにならない点を直す（割り勘で割り切れない分の処理）
  // (そんな気にならない程度の差ではあるかも)
  const participantBalances = calcBalance(event);
  const transactions = resolveBlance(participantBalances);

  return transactions;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Transaction[]>,
) {
  //   const eventId = req.body.input;
  const eventId = '203ae659-7222-4311-976e-75ed290e0e7b';
  const { events } = await fetchEventForCalc(eventId);
  const event = events[0];

  // TODO: 割り勘ロジックを作ってresultで返す
  const transactions = calcTransaction(event);

  res.status(200).json(transactions);
}
