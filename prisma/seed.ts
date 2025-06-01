import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();
  console.log('DB接続成功しました。');

  const deletePosts = await prisma.post.deleteMany({});

  console.log('DBのデータを削除しました。');
  // DBのデータを削除した後に、データを追加する


  const blog = await prisma.post.createMany({
    data: [
      {
        title: 'testBlog1',
        description: 'testBlog1Description',
        userProfileId: process.env.DEFAULT_SUPABASE_USER_ID,
      },
      {
        title: 'testBlog2',
        description: 'testBlog2Description',
        userProfileId: process.env.DEFAULT_SUPABASE_USER_ID,
      },
      {
        title: 'testBlog3',
        description: 'testBlog3Description',
        userProfileId: process.env.DEFAULT_SUPABASE_USER_ID,
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
