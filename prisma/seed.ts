import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();
  console.log('DB接続成功しました。');

  const deletePosts = await prisma.post.deleteMany({});
  const deleteUsers = await prisma.user.deleteMany({});

  console.log('DBのデータを削除しました。');
  console.log('削除したデータ:', deleteUsers, deletePosts);
  // DBのデータを削除した後に、データを追加する

  const user = await prisma.user.createMany({
    data: [
      {
        id: 1,
        name: 'testUser1',
        email: 'test1234@test.jp',
        password: 'testPassword',
      },
      {
        id: 2,
        name: 'testUser2',
        email: 'test2345@test.jp',
        password: 'testPassword1',
      },
      {
        id: 3,
        name: 'testUser3',
        email: 'test4567@test.com',
        password: 'testPassword2',
      },
    ],
    skipDuplicates: true,
  });

  console.log('User created:', user);

  const blog = await prisma.post.createMany({
    data: [
      {
        title: 'testBlog1',
        description: 'testBlog1Description',
        userId: 1,
      },
      {
        title: 'testBlog2',
        description: 'testBlog2Description',
        userId: 2,
      },
      {
        title: 'testBlog3',
        description: 'testBlog3Description',
        userId: 3,
      },
    ],
    skipDuplicates: true,
  });

  console.log('blog created:', blog);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
