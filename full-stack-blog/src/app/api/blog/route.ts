import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function main() {
  try {
    await prisma.$connect();
    console.log("DB接続成功しました。")
  }
  catch (error) {
    return Error("DB接続失敗しました。")
  }
}

export const GET = async (req:Request, res: NextResponse) => {
  try {
    await main();
    const posts = await prisma.post.findMany();
    return NextResponse.json({ message:"Sucessです。",posts },{ status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Errorです。",error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
    console.log("DB切断しました。")
  }
}