import Payments from './Payments';
import { render, screen } from '@testing-library/react';
import { useGetPaymentsQuery, GetPaymentsQuery } from '@generated/graphql';
import { UseQueryResult } from '@tanstack/react-query';
import '@testing-library/jest-dom';

jest.mock('@generated/graphql', () => ({
  __esModule: true,
  useGetPaymentsQuery: jest.fn(),
}));

describe('SumPrice', () => {
  test('値取得成功時、2件の支払いが表示される', () => {
    (useGetPaymentsQuery as jest.Mock).mockImplementation(
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
    expect(firstPaymentNameNode?.textContent).toBe('ガソリン代');
    const secondPaymentNameNode = tableRows[4].lastChild;
    expect(secondPaymentNameNode?.textContent).toBe('夜ご飯代');
  });

  test('値取得成功時、paymentsが0件の場合tableを表示しない', () => {
    (useGetPaymentsQuery as jest.Mock).mockImplementation(
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
  'data' | 'isLoading' | 'isError'
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
          },
          {
            id: 6,
            name: 'Satoshi',
          },
          {
            id: 7,
            name: 'Ken',
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
          },

          {
            id: 6,
            name: 'Satoshi',
          },
          {
            id: 7,
            name: 'Ken',
          },
          {
            id: 8,
            name: 'Yoshiki',
          },
        ],
      },
    ],
  },
  isLoading: false,
  isError: false,
};

const successfulResultWithNoPayments: ResultType = {
  data: {
    payments: [],
  },
  isLoading: false,
  isError: false,
};

const loadingResult: ResultType = {
  data: undefined,
  isLoading: true,
  isError: false,
};

const errorResult: ResultType = {
  data: undefined,
  isLoading: false,
  isError: true,
};
