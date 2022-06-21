import Payments from './Payments';
import { render, screen } from '@testing-library/react';
import {
  QueryPaymentsQueryHookResult,
  useQueryPaymentsQuery,
} from '../generated/graphql';
import { ApolloError } from '@apollo/client';
import '@testing-library/jest-dom';

jest.mock('../generated/graphql', () => ({
  __esModule: true,
  useQueryPaymentsQuery: jest.fn(),
}));

describe('SumPrice', () => {
  test('値取得成功時、2件の支払いが表示される', () => {
    (useQueryPaymentsQuery as jest.Mock).mockImplementation(
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
    (useQueryPaymentsQuery as jest.Mock).mockImplementation(
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

  test('ローディング時、金額を表示しない', () => {
    (useQueryPaymentsQuery as jest.Mock).mockImplementation(
      () => loadingResult,
    );
    const { container } = render(
      <Payments
        id="935ae70e-581c-4748-b8e1-503408a40f00" // 意味のないUUID
        setDeleteTarget={() => {}}
        onOpen={() => {}}
      />,
    );

    const loadingNode = container.getElementsByClassName('chakra-spinner')[0];
    expect(loadingNode).toBeInTheDocument();
  });

  test('値取得失敗時、エラーメッセージを表示する', () => {
    (useQueryPaymentsQuery as jest.Mock).mockImplementation(() => errorResult);
    render(
      <Payments
        id="935ae70e-581c-4748-b8e1-503408a40f00" // 意味のないUUID
        setDeleteTarget={() => {}}
        onOpen={() => {}}
      />,
    );

    const PaymentsNode = screen.getByTestId('errorText');
    expect(PaymentsNode?.textContent).toContain('データ取得に失敗しました。');
  });
});

type ResultType = Pick<
  QueryPaymentsQueryHookResult,
  'data' | 'loading' | 'error'
>;

const successfulResultWithTwoPayments: ResultType = {
  data: {
    events: [
      {
        id: '935ae70e-581c-4748-b8e1-503408a40f00',
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
                participant: {
                  id: 5,
                  name: 'Takashi',
                },
              },
              {
                participant: {
                  id: 6,
                  name: 'Satoshi',
                },
              },
              {
                participant: {
                  id: 7,
                  name: 'Ken',
                },
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
                participant: {
                  id: 5,
                  name: 'Takashi',
                },
              },
              {
                participant: {
                  id: 6,
                  name: 'Satoshi',
                },
              },
              {
                participant: {
                  id: 7,
                  name: 'Ken',
                },
              },
              {
                participant: {
                  id: 8,
                  name: 'Yoshiki',
                },
              },
            ],
          },
        ],
      },
    ],
  },
  loading: false,
  error: undefined,
};

const successfulResultWithNoPayments: ResultType = {
  data: {
    events: [
      {
        id: '935ae70e-581c-4748-b8e1-503408a40f00',
        payments: [],
      },
    ],
  },
  loading: false,
  error: undefined,
};

const loadingResult: ResultType = {
  data: undefined,
  loading: true,
  error: undefined,
};

const errorResult: ResultType = {
  data: undefined,
  loading: false,
  error: new ApolloError({
    errorMessage: 'Failed to fetch data',
  }),
};
