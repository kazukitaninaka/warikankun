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

const testResult2 = {
  id: '2cd83dfe-0f9d-446a-8778-e865daac862f',
  name: 'テスト2',
  sumPrice: 101755,
  transactions: [
    {
      from: { id: 13, name: '山田', shouldHavePaid: 12680 },
      to: [
        { id: 17, name: '伊藤', amount: 3550 },
        { id: 19, name: '小川', amount: 1629 },
      ],
    },
    { from: { id: 14, name: '田中', shouldHavePaid: 14179 }, to: [] },
    {
      from: { id: 15, name: '髙橋', shouldHavePaid: 15973 },
      to: [{ id: 17, name: '伊藤', amount: 15972 }],
    },
    {
      from: { id: 16, name: '川上', shouldHavePaid: 9320 },
      to: [
        { id: 14, name: '田中', amount: 8401 },
        { id: 19, name: '小川', amount: 919 },
      ],
    },
    { from: { id: 17, name: '伊藤', shouldHavePaid: 16348 }, to: [] },
    {
      from: { id: 18, name: '小林', shouldHavePaid: 17376 },
      to: [{ id: 19, name: '小川', amount: 17375 }],
    },
    { from: { id: 19, name: '小川', shouldHavePaid: 15884 }, to: [] },
  ],
};

describe('割り勘計算がうまくいく', () => {
  test('全員が均等に割り勘したケース', async () => {
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
  test('割り勘に参加しなかったり、支払いに傾斜をつけたりしたタイプ', async () => {
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
              eventId: '2cd83dfe-0f9d-446a-8778-e865daac862f',
            },
          }),
        });
        expect(await res.json()).toStrictEqual(testResult2);
      },
    });
  });
});
