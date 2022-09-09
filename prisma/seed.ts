import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const test = await prisma.event.create({
    data: {
      name: 'test event',
    },
  });
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
