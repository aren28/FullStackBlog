import { PrismaClient } from '@/generated/prisma';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function main() {
  try {
    await prisma.$connect();
    console.log('DB接続成功しました。');
  } catch (error) {
    console.error('Error:', error);
    return Error('DB接続失敗しました。');
  }
}

// singlePostの取得
export const GET = async (req: Request, _res: NextResponse) => {
  try {
    await main();
    const posts = await prisma.post.findFirst({
      where: { id: parseInt(req.url.split('/blog/')[1]) },
    });
    return NextResponse.json({ message: 'Sucessです。', posts }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Errorです。', error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
    console.log('DB切断しました。');
  }
};

// ブログの編集API
export const PUT = async (req: Request, _res: NextResponse) => {
  try {
    const id: number = parseInt(req.url.split('/blog/')[1]);
    const { title, description } = await req.json();
    await main();
    const post = await prisma.post.update({
      data: { title, description },
      where: { id },
    });
    return NextResponse.json({ message: 'Sucessです。', post }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Errorです。', error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
    console.log('DB切断しました。');
  }
};

// ブログの削除API
export const DELETE = async (req: Request, _res: NextResponse) => {
  try {
    const id: number = parseInt(req.url.split('/blog/')[1]);

    await main();
    const post = await prisma.post.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Sucessです。', post }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Errorです。', error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
    console.log('DB切断しました。');
  }
};
