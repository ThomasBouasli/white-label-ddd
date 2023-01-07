import { PrismaClient } from '@prisma/client';

import { users } from '@application/infra/database/seeds/user';

import { PrismaUserMapper } from '@module/user/providers/user-mapper/prisma-user-mapper';

const prisma = new PrismaClient();

async function main() {
  const usersCreated = await prisma.user.createMany({
    data: users.map((user) => PrismaUserMapper.toPersistence(user)),
  });

  console.log(`Created users: ${usersCreated}`);
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
