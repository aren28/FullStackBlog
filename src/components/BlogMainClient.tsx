'use client';

import { ReactNode, useEffect } from 'react';
import { useGetBlogSelectedQuery } from '../store/services/blog';
import MainGrid from '../components/MainGrid';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Stack, Box } from '@mui/material';
import { PostItem } from '@/types';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setUser } from '@/store/slices/userSlices';
import { useRouter } from 'next/navigation';

dayjs.extend(utc);
dayjs.extend(timezone);

type UserProps = {
  user: {
    email: string;
    id: string;
  };
};

export default function BlogMainClient({ user }: UserProps): ReactNode | Promise<ReactNode> {
  const { data, error, isLoading } = useGetBlogSelectedQuery(user.id);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(setUser({ email: user.email, id: user.id }));
    if (user.email == undefined || user.email == null) {
      router.push('/login');
    }
  }, [user, dispatch, router]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;
  if (!data) return null;

  const formattedDateList = data.posts.map((post: PostItem) => ({
    ...post,
    DateTime: dayjs(post.DateTime).tz('Asia/Tokyo').format('YYYY/MM/DD HH:mm:ss'),
  }));

  return (
    <Box sx={{ display: 'flex', background: 'transparent', width: '100%' }}>
      <Box component={'main'} sx={{ width: '100%' }}>
        <Stack
          spacing={2}
          sx={{ alignItems: 'center', mx: 'auto', pb: 5, mt: { xs: 8, md: 0 }, width: '100%' }}
        >
          <MainGrid formattedDateList={formattedDateList} />
        </Stack>
      </Box>
    </Box>
  );
}
