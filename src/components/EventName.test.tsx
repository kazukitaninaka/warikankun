import EventName from './EventName';
import { render, screen } from '@testing-library/react';
import { useGetEventNameQuery, GetEventNameQuery } from '@generated/graphql';
import { UseQueryResult } from '@tanstack/react-query';
import '@testing-library/jest-dom';

type ResultType = Pick<
  UseQueryResult<GetEventNameQuery, unknown>,
  'data' | 'isLoading' | 'isError'
>;

const successfulResult: ResultType = {
  data: {
    event: {
      id: '935ae70e-581c-4748-b8e1-503408a40f00',
      name: 'ぶらり旅',
    },
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

jest.mock('@generated/graphql', () => ({
  __esModule: true,
  useGetEventNameQuery: jest.fn(),
}));

describe('SumPrice', () => {
  test('値取得成功時、イベント名が表示される', () => {
    (useGetEventNameQuery as jest.Mock).mockImplementation(
      () => successfulResult,
    );
    render(<EventName id="935ae70e-581c-4748-b8e1-503408a40f00" />); // 意味のないUUID

    expect(screen.getByText('イベント名：ぶらり旅')).toBeInTheDocument();
  });

  test('ローディング時、イベント名を表示しない', () => {
    (useGetEventNameQuery as jest.Mock).mockImplementation(() => loadingResult);
    render(<EventName id="935ae70e-581c-4748-b8e1-503408a40f00" />); // 意味のないUUID

    expect(screen.getByText('イベント名：')).toBeInTheDocument();
  });

  test('値取得失敗時、エラーメッセージを表示する', () => {
    (useGetEventNameQuery as jest.Mock).mockImplementation(() => errorResult);
    render(<EventName id="935ae70e-581c-4748-b8e1-503408a40f00" />); // 意味のないUUID

    expect(screen.getByText('データ取得に失敗しました。')).toBeInTheDocument();
  });
});
