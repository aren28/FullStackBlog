'use client';

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer } from 'react-toastify';

import { useToast } from '@/hooks/useToast';

const postBlog = async (title: string | undefined, description: string | undefined) => {
  const res = await fetch('http://localhost:3000/api/blog', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, description, userId: 1 }),
  });

  if (!res.ok) {
    throw new Error('Failed to create blog post');
  }

  return res.json();
};

const PostBlog = () => {
  const router = useRouter();
  const { showSuccess, showInfo } = useToast();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    showInfo('投稿中です...');

    await postBlog(titleRef.current?.value, descriptionRef.current?.value);

    showSuccess('投稿が完了しました。');

    router.push('/');
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
};

export default PostBlog;
