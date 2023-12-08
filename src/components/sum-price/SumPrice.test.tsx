import SumPrice from './SumPrice';
import { render, screen } from '@testing-library/react';
import { useGetSumPriceQuery, GetSumPriceQuery } from '@generated/graphql';
import { UseQueryResult } from '@tanstack/react-query';

type ResultType = Pick<
  UseQueryResult<GetSumPriceQuery, unknown>,
  'data' | 'isPending' | 'isError'
>;

const successfulResult: ResultType = {
  data: {
    event: {
      id: '935ae70e-581c-4748-b8e1-503408a40f00',
      sumPrice: 21345,
    },
  },
  isPending: false,
  isError: false,
};

const loadingResult: ResultType = {
  data: undefined,
  isPending: true,
  isError: false,
};

const errorResult: ResultType = {
  data: undefined,
  isPending: false,
  isError: true,
};

jest.mock('@generated/graphql', () => ({
  __esModule: true,
  useGetSumPriceQuery: jest.fn(),
}));

describe('SumPrice', () => {
  test('値取得成功時、正しいフォーマットで金額が表示される', () => {
    (useGetSumPriceQuery as unknown as jest.Mock).mockImplementation(
      () => successfulResult,
    );
    render(<SumPrice id="935ae70e-581c-4748-b8e1-503408a40f00" />); // 意味のないUUID

    const sumPriceNode = screen.getByTestId('text');
    expect(sumPriceNode?.textContent).toBe('支払い総額：￥21,345');
  });

  test('ローディング時、金額を表示しない', () => {
    (useGetSumPriceQuery as unknown as jest.Mock).mockImplementation(
      () => loadingResult,
    );
    render(<SumPrice id="935ae70e-581c-4748-b8e1-503408a40f00" />); // 意味のないUUID

    const sumPriceNode = screen.getByTestId('text');
    expect(sumPriceNode?.textContent).toBe('支払い総額：');
  });

  test('値取得失敗時、エラーメッセージを表示する', () => {
    (useGetSumPriceQuery as unknown as jest.Mock).mockImplementation(
      () => errorResult,
    );
    render(<SumPrice id="935ae70e-581c-4748-b8e1-503408a40f00" />); // 意味のないUUID

    const sumPriceNode = screen.getByTestId('errorText');
    expect(sumPriceNode?.textContent).toContain('データ取得に失敗しました。');
  });
});
