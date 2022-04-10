import { From, To } from '../generated/graphql';

export const formatNumberToJPY = (number: number) => {
  const option = { style: 'currency', currency: 'JPY' };
  const numberFormat = new Intl.NumberFormat('ja-JP', option);
  return numberFormat.format(number);
};

type TransactionInCalc = {
  from: From;
  to: (Omit<To, 'id'> & {
    participantId: number;
  })[];
};

export const makeRefundString = (transactions: TransactionInCalc[]) => {
  let refundString = '';
  transactions.forEach((transaction) => {
    refundString += `${transaction.from.name} (支払うべき金額: ${transaction.from.shouldHavePaid}円)\n`;
    if (!transaction.to.length) {
      refundString += '　- 精算なし\n\n';
    } else {
      transaction.to.forEach((el) => {
        refundString += `　- ${el.name}へ${el.amount}円\n\n`;
      });
    }
  });
  refundString += '\n\n';

  return refundString;
};
