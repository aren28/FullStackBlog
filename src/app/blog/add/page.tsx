'use client';

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';
import { useToast } from '@/hooks/useToast';
import { PostBlogType } from '@/types';
import { useAppSelector } from '@/hooks/useAppSelector';

const postBlogData = async ({ title, description, userprofileid }: PostBlogType) => {
  const res = await fetch('http://localhost:3000/api/blog', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description, userprofileid }),
  });

  if (!res.ok) {
    throw new Error('Failed to create blog post');
  }
};

export default function PostBlog() {
  const redirect = useRouter();
  const { user } = useAppSelector((state) => state.user);
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
        userprofileid: user?.id || '',
      });
      showSuccess('投稿が完了しました。');

      redirect.push('/blog');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        m="auto"
        height={'100vh'}
      >
        <Typography variant="h5" color="primary.contrastText" fontWeight="bold" p={3}>
          ブログ新規作成
        </Typography>
        <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: 500 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              inputRef={titleRef}
              placeholder="タイトルを入力"
              type="text"
              fullWidth
              margin="normal"
              variant="outlined"
              sx={{ backgroundColor: 'white' }}
            />
            <TextField
              inputRef={descriptionRef}
              placeholder="記事詳細を入力"
              multiline
              rows={4}
              fullWidth
              margin="normal"
              variant="outlined"
              sx={{ backgroundColor: 'white' }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: 'white',
                color: 'black',
                fontWeight: 'bold',
                mt: 2,
                mx: 'auto',
                display: 'block',
                boxShadow: 3,
                borderRadius: 2,
              }}
            >
              投稿
            </Button>
          </form>
        </Paper>
      </Box>
    </>
  );
}
