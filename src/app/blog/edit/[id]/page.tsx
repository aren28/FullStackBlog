'use client';

import React, { use, useRef } from 'react';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/useToast';
import { Box, Typography, TextField, Button, Paper, Stack } from '@mui/material';

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

const PostEdit = ({ params }: { params: Promise<{ id: number }> }) => {
  const router = useRouter();
  const { showSuccess, showInfo } = useToast();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const unWrappedParams = use(params);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    showInfo('投稿中です...');

    await editBlog(titleRef.current?.value, descriptionRef.current?.value, unWrappedParams.id);

    showSuccess('投稿が完了しました。');

    router.push('/blog');
  };

  const handleDelete = async () => {
    showInfo('削除中です...');
    await deleteBlog(unWrappedParams.id);
    showSuccess('投稿が完了しました。');
    router.push('/blog');
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
        height="100vh"
      >
        <Typography variant="h5" color="primary.contrastText" fontWeight="bold" p={3}>
          ブログの編集
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
            <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  fontWeight: 'bold',
                  boxShadow: 3,
                  borderRadius: 2,
                }}
              >
                更新
              </Button>
              <Button
                type="button"
                onClick={handleDelete}
                variant="contained"
                color="error"
                sx={{
                  fontWeight: 'bold',
                  boxShadow: 3,
                  borderRadius: 2,
                }}
              >
                削除
              </Button>
            </Stack>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default PostEdit;
