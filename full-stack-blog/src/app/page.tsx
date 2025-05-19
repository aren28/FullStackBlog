import { PostType } from '@/types';
import Link from 'next/link';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

async function fetchAllBlogs() {
  const res = await fetch(`http://localhost:3000/api/blog`, {
    cache: 'no-store', //SSR
  });

  const data = await res.json();

  return data.posts;
}

export default async function Home() {
  const posts = await fetchAllBlogs();
  console.log('posts', posts);

  // 日付のフォーマット
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const formattedDateList = await posts.map((post: PostType) => {
    const timestamp = post.DateTime;
    const newTimestamp = dayjs(timestamp).tz('Asia/Tokyo').format('YYYY/MM/DD HH:mm:ss');
    return {
      ...post,
      DateTime: newTimestamp,
    };
  });

  console.log('formattedDateList', formattedDateList);

  return (
    <main className="w-full h-full">
      <div className="md:w-2/4 sm:w-3/4 m-auto p-4 my-5 rounded-lg bg-black drop-shadow-xl">
        <h1 className="text-slate-200 text-center text-2xl font-extrabold">Full Stack Blog 📝</h1>
      </div>
      {/* Link */}
      <div className="flex my-5">
        <Link
          href={'/blog/add'}
          className=" md:w-1/6 sm:w-2/4 text-center rounded-md p-2 m-auto bg-slate-300 font-semibold"
        >
          ブログ新規作成
        </Link>
      </div>

      <div className="w-full flex flex-col justify-center items-center">
        {formattedDateList.map((post: PostType) => (
          <div
            key={post.id}
            className="w-3/4 mt-2 p-4 rounded-md mx-3 my-f2 bg-slate-300 flex flex-col justify-center"
          >
            <div className="flex items-center my-3">
              <div className="mr-auto">
                <h2 className="mr-auto font-semibold text-2xl">{post.title}</h2>
              </div>
              <Link
                href={`/blog/edit/${post.id}`}
                className="px-4 py-1 text-center text-xl bg-slate-900 rounded-md font-semibold text-slate-200"
              >
                編集
              </Link>
            </div>

            <div className="mr-auto my-1">
              <blockquote className="font-bold text-sky-500 underline decoration-sky-500">
                {post.DateTime}
              </blockquote>
            </div>

            <div className="mr-auto my-1">
              <h2>{post.description}</h2>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
