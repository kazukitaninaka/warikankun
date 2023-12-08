import Payments from './Payments';
import { render, screen } from '@testing-library/react';
import {
  useGetPaymentsQuery,
  GetPaymentsQuery,
  useDeletePaymentMutation,
} from '@generated/graphql';
import { UseQueryResult } from '@tanstack/react-query';
import { Providers } from 'src/testing/utils';

jest.mock('@generated/graphql', () => ({
  __esModule: true,
  useGetPaymentsQuery: jest.fn(),
  useDeletePaymentMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));

describe('SumPrice', () => {
  test('値取得成功時、2件の支払いが表示される', () => {
    (useGetPaymentsQuery as unknown as jest.Mock).mockImplementation(
      () => successfulResultWithTwoPayments,
    );
    (useDeletePaymentMutation as unknown as jest.Mock).mockImplementation(
      () => deletePaymentMutationReturnValue,
    );
    render(
      <Payments
        id="935ae70e-581c-4748-b8e1-503408a40f00" // 意味のないUUID
      />,
      { wrapper: Providers },
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
    (useGetPaymentsQuery as unknown as jest.Mock).mockImplementation(
      () => successfulResultWithNoPayments,
    );
    (useDeletePaymentMutation as unknown as jest.Mock).mockImplementation(
      () => deletePaymentMutationReturnValue,
    );
    render(
      <Payments
        id="935ae70e-581c-4748-b8e1-503408a40f00" // 意味のないUUID
      />,
      { wrapper: Providers },
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

const deletePaymentMutationReturnValue = {
  isError: false,
  isPending: false,
  mutate: jest.fn(),
};
