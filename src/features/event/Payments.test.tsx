import Payments from './Payments';
import { render, screen } from '@testing-library/react';
import { useGetPaymentsQuery, GetPaymentsQuery } from '@generated/graphql';
import { UseQueryResult } from '@tanstack/react-query';

jest.mock('@generated/graphql', () => ({
  __esModule: true,
  useGetPaymentsQuery: jest.fn(),
}));

describe('SumPrice', () => {
  test('値取得成功時、2件の支払いが新しく追加された順で表示される', () => {
    (useGetPaymentsQuery as unknown as jest.Mock).mockImplementation(
      () => successfulResultWithTwoPayments,
    );
    render(
      <Payments
        id="935ae70e-581c-4748-b8e1-503408a40f00" // 意味のないUUID
        setDeleteTarget={() => {}}
        onOpen={() => {}}
      />,
    );

    const tables = screen.getAllByRole('table');
    expect(tables.length).toBe(2);

    const tableRows = screen.getAllByRole('row');
    const firstPaymentNameNode = tableRows[0].lastChild;
    expect(firstPaymentNameNode?.textContent).toBe('夜ご飯代');
    const secondPaymentNameNode = tableRows[4].lastChild;
    expect(secondPaymentNameNode?.textContent).toBe('ガソリン代');
  });

  test('値取得成功時、paymentsが0件の場合tableを表示しない', () => {
    (useGetPaymentsQuery as unknown as jest.Mock).mockImplementation(
      () => successfulResultWithNoPayments,
    );
    render(
      <Payments
        id="935ae70e-581c-4748-b8e1-503408a40f00" // 意味のないUUID
        setDeleteTarget={() => {}}
        onOpen={() => {}}
      />,
    );

    const table = screen.queryByRole('table');
    expect(table).not.toBeInTheDocument();
  });
});

type ResultType = Pick<
  UseQueryResult<GetPaymentsQuery, unknown>,
  'data' | 'isPending' | 'isError'
>;

const successfulResultWithTwoPayments: ResultType = {
  data: {
    payments: [
      {
        id: 1,
        name: 'ガソリン代',
        amount: 6000,
        createdAt: new Date(),
        whoPaid: {
          id: 5,
          name: 'Takashi',
        },
        whoShouldPay: [
          {
            id: 5,
            name: 'Takashi',
            ratio: 1,
          },
          {
            id: 6,
            name: 'Satoshi',
            ratio: 1,
          },
          {
            id: 7,
            name: 'Ken',
            ratio: 1,
          },
        ],
      },
      {
        id: 2,
        name: '夜ご飯代',
        amount: 12000,
        createdAt: new Date(),
        whoPaid: {
          id: 8,
          name: 'Yoshiki',
        },
        whoShouldPay: [
          {
            id: 5,
            name: 'Takashi',
            ratio: 1,
          },

          {
            id: 6,
            name: 'Satoshi',
            ratio: 1,
          },
          {
            id: 7,
            name: 'Ken',
            ratio: 1,
          },
          {
            id: 8,
            name: 'Yoshiki',
            ratio: 1,
          },
        ],
      },
    ],
  },
  isPending: false,
  isError: false,
};

const successfulResultWithNoPayments: ResultType = {
  data: {
    payments: [],
  },
  isPending: false,
  isError: false,
};
