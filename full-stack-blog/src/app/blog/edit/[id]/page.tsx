'use client';

import React, { useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/useToast';

const editBlog = async (
  title: string | undefined,
  description: string | undefined,
  id: number | undefined,
) => {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, description, id }),
  });

  if (!res.ok) {
    throw new Error('Failed to edit blog post');
  }

  return res.json();
};

const deleteBlog = async (id: number | undefined) => {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to delete blog post');
  }

  return res.json();
};

const PostEdit = ({ params }: { params: { id: number } }) => {
  const router = useRouter();
  const { showSuccess, showInfo } = useToast();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    showInfo('投稿中です...');

    await editBlog(titleRef.current?.value, descriptionRef.current?.value, params.id);

    showSuccess('投稿が完了しました。');

    router.push('/');
  };

  console.log('params.id', params.id);

  const handleDelete = async () => {
    showInfo('削除中です...');
    await deleteBlog(params.id);
    showSuccess('投稿が完了しました。');
    router.push('/');
  };

  return (
    <>
      <div className="w-full m-auto flex my-4">
        <ToastContainer />
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3">ブログの編集 🚀</p>
          <form onSubmit={handleSubmit}>
            <input
              ref={titleRef}
              placeholder="タイトルを入力"
              type="text"
              className="rounded-md px-4 w-full py-2 my-2"
            />
            <textarea
              ref={descriptionRef}
              placeholder="記事詳細を入力"
              className="rounded-md px-4 py-2 w-full my-2"
            ></textarea>
            <button
              type="submit"
              className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100"
            >
              更新
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="ml-2 font-semibold px-4 py-2 shadow-xl bg-red-400 rounded-lg m-auto hover:bg-slate-100"
            >
              削除
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostEdit;
