import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Add from './Add';
import { Providers } from 'src/testing/utils';

// NOTE: https://github.com/vercel/next.js/issues/7479#issuecomment-545212303
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
  useServerInsertedHTML: jest.fn(),
}));

jest.mock('@generated/graphql', () => ({
  __esModule: true,
  useGetParticipantsQuery: jest.fn().mockReturnValue({
    data: {
      participants: [
        {
          id: 1,
          name: '太郎',
        },
        {
          id: 2,
          name: '次郎',
        },
      ],
    },
  }),
  useCreatePaymentMutation: jest.fn().mockReturnValue({
    mutate: jest.fn(),
  }),
  useGetEventNameQuery: jest.fn().mockReturnValue({
    data: {
      event: {
        name: '大阪旅行',
      },
    },
  }),
}));

test('割り勘対象が0人で支払い追加しようとすると、エラーメッセージ"割り勘対象がいません。"が表示される', async () => {
  const user = userEvent.setup();
  render(<Add id="935ae70e-581c-4748-b8e1-503408a40f00" />, {
    wrapper: Providers,
  });

  await user.type(screen.getByLabelText('支払い名'), 'ガソリン代');
  await user.type(screen.getByLabelText('金額'), '6000');
  await user.selectOptions(screen.getByLabelText('支払った人'), '太郎');

  const checkBoxes = await screen.findAllByRole('checkbox', { checked: true });
  // // uncheck all checkboxes
  for (const checkbox of checkBoxes) {
    await user.click(checkbox);
  }

  await user.click(screen.getByRole('button', { name: '追加' }));

  const errorMessage = await screen.findByText('割り勘対象がいません。');
  expect(errorMessage).toBeInTheDocument();
});
