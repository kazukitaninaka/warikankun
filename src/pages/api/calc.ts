// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Res = {
  id: string;
  name: string;
  sumPrice: number;
  transactions: Transaction[];
};

type Transaction = {
  from: {
    id: number;
    name: string;
  };
  to: {
    id: number;
    name: string;
    amount: number;
  }[];
};

type FetchEventResponse = {
  events: Event[];
};

type Event = {
  id: string;
  name: string;
  payments: Payment[];
  participants: Participant[];
  payments_aggregate: {
    aggregate: {
      sum: {
        amount: number;
      };
    };
  };
};

type Participant = {
  id: number;
  name: string;
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
  ratio: number;
};

type ParticipantBalance = {
  id: number;
  name: string;
  balance: number;
  shouldHavePaid: number;
};

const fetchEventForCalc = async (
  eventId: string,
): Promise<FetchEventResponse> => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_GRAPHQL_REST_ENDPOINT}/api/rest/eventForCalc/${eventId}`,
    {
      headers: {
        'x-hasura-admin-secret': process.env.NEXT_PUBLIC_X_HASURA_ADMIN_SECRET!,
      },
    },
  );

  return await data.json();
};

const calcAmountForRest = (amount: number, whoShouldPay: WhoShouldPay[]) => {
  const defaultAmountPerPerson = amount / whoShouldPay.length;

  // ratioが1でない人たちの総額
  const sumOfCustomAmount = whoShouldPay.reduce(
    (prev, curr) => {
      if (curr.ratio === 1 || curr.ratio === null) return prev; // "そのまま"の場合。 過去のデータに対応するためnullの場合も。
      return {
        sumAmount: prev.sumAmount + defaultAmountPerPerson * curr.ratio,
        sumParticipants: prev.sumParticipants + 1,
      };
    },
    { sumAmount: 0, sumParticipants: 0 },
  );

  const amountForRest =
    (amount - sumOfCustomAmount.sumAmount) /
    (whoShouldPay.length - sumOfCustomAmount.sumParticipants);

  return amountForRest;
};

const calcBalance = (event: Event): ParticipantBalance[] => {
  let participantBalances = event.participants.map((participant) => ({
    id: participant.id,
    name: participant.name,
    balance: 0,
    shouldHavePaid: 0,
  }));

  event.payments.forEach((payment) => {
    // 支払った人は「支払ったトータル金額」ー「自分が払うべき金額」をプラス
    // whoShouldPayの人たちは「自分が払うべき金額」をマイナス
    const defaultAmountPerPerson = payment.amount / payment.whoShouldPay.length;
    const amountForRest = calcAmountForRest(
      payment.amount,
      payment.whoShouldPay,
    );

    participantBalances = participantBalances.map((participantBalance) => {
      const newParticipantBalance = { ...participantBalance };
      // もし払った人だったらbalanceに支払い分を追加
      if (participantBalance.id === payment.whoPaid.id) {
        newParticipantBalance.balance += payment.amount;
      }
      // もし払うべき人だったらdebtの分引く、shouldHavePaidに一人分の金額を追加
      const personIndexToPay = payment.whoShouldPay.findIndex(
        (el) => el.participantId === participantBalance.id,
      );
      if (personIndexToPay > -1) {
        const ratio = payment.whoShouldPay[personIndexToPay].ratio;
        const appliesAmountForRest = ratio === 1 || ratio === null; // 過去のデータに対応するためnullの場合も
        newParticipantBalance.balance -= appliesAmountForRest
          ? amountForRest
          : defaultAmountPerPerson * ratio;
        newParticipantBalance.shouldHavePaid += appliesAmountForRest
          ? amountForRest
          : defaultAmountPerPerson * ratio;
      }

      return newParticipantBalance;
    });
  });

  // balanceの計算がすべて終わったところで、balanceの小数点以下を四捨五入
  participantBalances = participantBalances.map((participantBalance) => ({
    ...participantBalance,
    balance: Math.round(participantBalance.balance),
  }));

  return participantBalances;
};

const resolveBalance = (participantBalances: ParticipantBalance[]) => {
  let transactions: Transaction[] = participantBalances.map((participant) => ({
    from: {
      id: participant.id,
      name: participant.name,
      shouldHavePaid: Math.ceil(participant.shouldHavePaid),
    },
    to: [],
  }));
  let _participantBalances = [...participantBalances];
  while (true) {
    // sort participantBalances by descending order
    _participantBalances.sort((a, b) => b.balance - a.balance);

    const paidTooMuch = _participantBalances[0]; // 一番多めに払った人
    const paidLess = _participantBalances[_participantBalances.length - 1]; // 一番払っていない人

    if (paidTooMuch.balance === 0 || paidLess.balance === 0) break;

    const transactionAmount = Math.min(
      paidTooMuch.balance,
      Math.abs(paidLess.balance),
    );

    const indexOfWhoGetsRefunded = transactions.findIndex(
      (transaction) => transaction.from.id === paidLess.id,
    );

    // transactionsのtoに支払い先と支払額を追加
    transactions[indexOfWhoGetsRefunded] = {
      ...transactions[indexOfWhoGetsRefunded],
      to: [
        ...transactions[indexOfWhoGetsRefunded].to,
        {
          id: paidTooMuch.id,
          name: paidTooMuch.name,
          amount: transactionAmount,
        },
      ],
    };

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
  const transactions = resolveBalance(participantBalances);

  return transactions;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Res>,
) {
  const { eventId } = req.body.input;
  const { events } = await fetchEventForCalc(eventId);
  const event = events[0];

  const transactions = calcTransaction(event);

  const result = {
    id: event.id,
    name: event.name,
    sumPrice: event.payments_aggregate.aggregate.sum.amount,
    transactions,
  };

  res.status(200).json(result);
}
