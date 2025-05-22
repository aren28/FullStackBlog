import { PrismaClient } from '@/generated/prisma';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function main() {
  try {
    await prisma.$connect();
    console.log('DB接続成功しました。');
  } catch (error) {
    console.error('DB接続失敗しました。', error);
    // DB接続失敗時の処理
    return Error('DB接続失敗しました。');
  }
}

// User追加用のAPI
export const POST = async (req: Request, _res: NextResponse) => {
  try {
    const { name, email, password } = await req.json();
    await main();
    const post = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    return NextResponse.json({ message: 'Sucessです。', post }, { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Errorです。', error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
    console.log('DB切断しました。');
  }
};
