'use client';

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer } from 'react-toastify';

import { useToast } from '@/hooks/useToast';
import { PostBlogType } from '@/types';

const postBlogData = async ({ title, description, userProfileId }: PostBlogType) => {
  const res = await fetch('http://localhost:3000/api/blog', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description, userProfileId }),
  });

  if (!res.ok) {
    throw new Error('Failed to create blog post');
  }
};

export default function PostBlog() {
  const redirect = useRouter();
  const { showSuccess, showInfo } = useToast();

  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    showInfo('投稿中です...');

    if (!titleRef.current?.value || !descriptionRef.current?.value) {
      showInfo('タイトルと記事詳細を入力してください。');
      return;
    }

    try {
      await postBlogData({
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        userProfileId: process.env.DEFAULT_SUPABASE_USER_ID || '',
      });
      showSuccess('投稿が完了しました。');
      redirect.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="w-full m-auto flex my-4">
        <ToastContainer />
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3">ブログ新規作成 🚀</p>
          <form onSubmit={handleSubmit}>
            <input
              ref={titleRef}
              placeholder="タイトルを入力"
              type="text"
              className="rounded-md px-4 w-full py-2 my-2 border-2 border-slate-200"
            />
            <textarea
              ref={descriptionRef}
              placeholder="記事詳細を入力"
              rows={4}
              className="rounded-md px-4 py-2 w-full my-2 border-2 border-slate-200"
            ></textarea>
            <button className="cursor-pointer font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
              投稿
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
