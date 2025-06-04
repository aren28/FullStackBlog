import { PostType } from '@/types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import SideMenu from '../components/SideMenu';
import MainGrid from '../components/MainGrid';

import { Stack, Box } from '@mui/material';
import { createClient } from '@/utils/supabase/server';

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

  if (!user) {
    return null;
  }

  const posts = await fetchAllBlogs();

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
    <Box
      sx={{
        display: 'flex',
        background: 'transparent',
        width: '100%',
      }}
    >
      <Box component={'main'} sx={{ width: '100%' }}>
        <Stack
          spacing={2}
          sx={{
            alignItems: 'center',
            mx: 'auto',
            pb: 5,
            mt: { xs: 8, md: 0 },
            width: '100%',
          }}
        >
          <MainGrid formattedDateList={formattedDateList} />
        </Stack>
      </Box>
    </Box>
  );
}
