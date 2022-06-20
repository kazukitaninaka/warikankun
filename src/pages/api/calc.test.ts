import { testApiHandler } from 'next-test-api-route-handler';
import handler from './calc';

const testResult1 = {
  id: '7ce75d64-138b-4bd6-be3a-a7c2eeaaffb3',
  name: 'テスト',
  sumPrice: 18300,
  transactions: [
    { from: { id: 9, name: 'Caden', shouldHavePaid: 4575 }, to: [] },
    { from: { id: 10, name: 'Tyler', shouldHavePaid: 4575 }, to: [] },
    {
      from: { id: 11, name: 'Haden', shouldHavePaid: 4575 },
      to: [
        { id: 9, name: 'Caden', amount: 3725 },
        { id: 10, name: 'Tyler', amount: 850 },
      ],
    },
    {
      from: { id: 12, name: 'Sally', shouldHavePaid: 4575 },
      to: [{ id: 10, name: 'Tyler', amount: 2575 }],
    },
  ],
};

describe('割り勘計算がうまくいく', () => {
  test('ケース1', async () => {
    await testApiHandler({
      url: 'api/calc',
      handler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            input: {
              eventId: '7ce75d64-138b-4bd6-be3a-a7c2eeaaffb3',
            },
          }),
        });
        expect(await res.json()).toStrictEqual(testResult1);
      },
    });
  });
});
