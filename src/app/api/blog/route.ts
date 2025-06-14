import { PrismaClient } from '@/generated/prisma';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log('DB接続成功しました。');
  } catch (error) {
    console.error('DB接続失敗しました。', error);
    return Error('DB接続失敗しました。');
  }
}

export const GET = async (_req: Request, { params: _ }: { params: Promise<{ id: string }> }) => {
  try {
    await main();
    const posts = await prisma.post.findMany();
    return NextResponse.json({ message: `Sucessです。`, posts }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Errorです。', error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
    console.log('DB切断しました。');
  }
};

// ブログの投稿用API
export const POST = async (req: Request, { params: _ }: { params: Promise<{ id: string }> }) => {
  try {
    const { title, description, userprofileid } = await req.json();
    await main();
    const post = await prisma.post.create({
      data: {
        title,
        description,
        userprofileid: userprofileid || 'default-user-id', // ユーザープロフィールIDがない場合のデフォルト値
      },
    });
    return NextResponse.json({ message: `Sucessです。`, post }, { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Errorです。', error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
    console.log('DB切断しました。');
  }
};
