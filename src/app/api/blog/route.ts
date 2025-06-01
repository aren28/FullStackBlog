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

export const GET = async (_req: Request, { params }: { params: Promise<{ id: string }> }) => {
  try {
    await main();
    const { id } = await params
    const posts = await prisma.post.findMany();
    return NextResponse.json({ message: `Sucessです。${id}`, posts }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Errorです。', error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
    console.log('DB切断しました。');
  }
};

// ブログの投稿用API
export const POST = async (req: Request,  { params }: { params: Promise<{ id: string }> }) => {
  try {
    const { title, description, userId } = await req.json();
    await main();
        const { id } = await params
    const post = await prisma.post.create({
      data: {
        title,
        description,
        userProfileId: userId,
      },
    });
    return NextResponse.json({ message: `Sucessです。${id}`, post }, { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Errorです。', error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
    console.log('DB切断しました。');
  }
};
