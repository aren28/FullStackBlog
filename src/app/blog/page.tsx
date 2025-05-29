import { PostType } from '@/types';
import Link from 'next/link';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import SideMenu from '../components/SideMenu';
import MainGrid from '../components/MainGrid';

import { Stack, Box } from '@mui/material';

async function fetchAllBlogs() {
  const res = await fetch(`http://localhost:3000/api/blog`, {
    cache: 'no-store', //SSR
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return data.posts;
}

export default async function BlogMain() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const posts = await fetchAllBlogs();

  console.log({ user, typeofUser: typeof user });

  const isAuthenticated = user !== null;

  if (!isAuthenticated) {
    redirect('/register');
  }

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

  return (
    <main className="w-full h-full">
      <Box
        sx={{
          display: 'flex',
          background: 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }}
      >
        <SideMenu currentUser={{ email: user?.email ?? 'No Name' }} />
        <Box
          component={'main'}
          sx={{
            background: 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
          }}
        >
          <Stack
            spacing={2}
            sx={{
              background:
                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <MainGrid formattedDateList={formattedDateList} />
          </Stack>
        </Box>
      </Box>
    </main>
  );
}
