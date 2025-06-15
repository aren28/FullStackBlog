import { PrismaClient } from '@/generated/prisma';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log('DB接続成功しました。');
  } catch (error) {
    console.error('Error:', error);
    return Error('DB接続失敗しました。');
  }
}

// singlePostの取得
export const GET = async (_req: Request, { params }: { params: Promise<{ id: string }> }) => {
  try {
    await main();
    const { id } = await params;
    const posts = await prisma.post.findMany({
      where: {
        userprofileid: id,
      },
    });
    return NextResponse.json({ message: `Sucess1です。`, posts }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Errorです。', error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
    console.log('DB切断しました。');
  }
};
