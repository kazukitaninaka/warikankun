import EventName from './EventName';
import { render, screen } from '@testing-library/react';
import {
  QueryEventNameQueryHookResult,
  useQueryEventNameQuery,
} from '@generated/deprecatedGraphql';
import { ApolloError } from '@apollo/client';
import '@testing-library/jest-dom';

type ResultType = Pick<
  QueryEventNameQueryHookResult,
  'data' | 'loading' | 'error'
>;

const successfulResult: ResultType = {
  data: {
    events: [
      {
        id: '935ae70e-581c-4748-b8e1-503408a40f00',
        name: 'ぶらり旅',
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

jest.mock('@generated/deprecatedGraphql', () => ({
  __esModule: true,
  useQueryEventNameQuery: jest.fn(),
}));

describe('SumPrice', () => {
  test('値取得成功時、イベント名が表示される', () => {
    (useQueryEventNameQuery as jest.Mock).mockImplementation(
      () => successfulResult,
    );
    render(<EventName id="935ae70e-581c-4748-b8e1-503408a40f00" />); // 意味のないUUID

    expect(screen.getByText('イベント名：ぶらり旅')).toBeInTheDocument();
  });

  test('ローディング時、イベント名を表示しない', () => {
    (useQueryEventNameQuery as jest.Mock).mockImplementation(
      () => loadingResult,
    );
    render(<EventName id="935ae70e-581c-4748-b8e1-503408a40f00" />); // 意味のないUUID

    expect(screen.getByText('イベント名：')).toBeInTheDocument();
  });

  test('値取得失敗時、エラーメッセージを表示する', () => {
    (useQueryEventNameQuery as jest.Mock).mockImplementation(() => errorResult);
    render(<EventName id="935ae70e-581c-4748-b8e1-503408a40f00" />); // 意味のないUUID

    expect(screen.getByText('データ取得に失敗しました。')).toBeInTheDocument();
  });
});
