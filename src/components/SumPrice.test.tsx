import SumPrice from './SumPrice';
import { render, screen } from '@testing-library/react';
import {
  QuerySumPriceQueryHookResult,
  useQuerySumPriceQuery,
} from '../generated/graphql';

type ResultType = Pick<
  QuerySumPriceQueryHookResult,
  'data' | 'loading' | 'error'
>;

const successfulResult: ResultType = {
  data: {
    events: [
      {
        id: '935ae70e-581c-4748-b8e1-503408a40f00',
        payments_aggregate: {
          aggregate: {
            sum: {
              amount: 21345,
            },
          },
        },
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

jest.mock('../generated/graphql', () => ({
  __esModule: true,
  useQuerySumPriceQuery: jest.fn(),
}));

describe('SumPrice', () => {
  test('値取得成功時、正しいフォーマットで金額が表示される', () => {
    (useQuerySumPriceQuery as jest.Mock).mockImplementation(
      () => successfulResult,
    );
    render(<SumPrice id="935ae70e-581c-4748-b8e1-503408a40f00" />); // 意味のないUUID

    const sumPriceNode = screen.getByTestId('text');
    expect(sumPriceNode?.textContent).toBe('支払い総額：￥21,345');
  });

  test('ローディング時、金額を表示しない', () => {
    (useQuerySumPriceQuery as jest.Mock).mockImplementation(
      () => loadingResult,
    );
    render(<SumPrice id="935ae70e-581c-4748-b8e1-503408a40f00" />); // 意味のないUUID

    const sumPriceNode = screen.getByTestId('text');
    expect(sumPriceNode?.textContent).toBe('支払い総額：');
  });
});
