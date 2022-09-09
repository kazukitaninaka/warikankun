import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  //   const test = await prisma.payment.create({
  //     data: {
  //       eventId: '4d13f0e5-a25a-4537-9590-b6ec98cfc4ac',
  //       name: 'コンビニ',
  //       amount: 1000,
  //       whoPaidId: 1,
  //     },
  //   });
  //   const test = await prisma.participant.createMany({
  //     data: [
  //       {
  //         name: 'John',
  //         eventId: '4d13f0e5-a25a-4537-9590-b6ec98cfc4ac',
  //       },
  //       {
  //         name: 'Abby',
  //         eventId: '4d13f0e5-a25a-4537-9590-b6ec98cfc4ac',
  //       },
  //       {
  //         name: 'Tom',
  //         eventId: '4d13f0e5-a25a-4537-9590-b6ec98cfc4ac',
  //       },
  //     ],
  //   });

  // const test = await prisma.payment.create({
  //   data: {
  //     eventId: '4d13f0e5-a25a-4537-9590-b6ec98cfc4ac',
  //     name: 'コンビニ',
  //     whoPaidId: 1,
  //     amount: 3000,
  //     whoShouldPay: {
  //       create: [
  //         { participantId: 1, ratio: 1 },
  //         { participantId: 2, ratio: 1 },
  //         { participantId: 3, ratio: 1 },
  //       ],
  //     },
  //   },
  // });
  console.log(test);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
