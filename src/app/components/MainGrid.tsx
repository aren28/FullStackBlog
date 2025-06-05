'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import Link from 'next/link';
import { PostItem } from '@/types';

const MainContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
  },
}));

export default function MainGrid({ formattedDateList }: { formattedDateList: PostItem[] }) {
  return (
    <MainContainer sx={{ width: '100%', height: '100%', maxWidth: { sm: '100%', md: '100%' } }}>
      {/* cards */}
      <TableContainer component={Paper} sx={{ color: 'white', background: 'white' }}>
        <Table sx={{ minWidth: '1000px', background: 'transparent' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'black' }}>タイトル</TableCell>
              <TableCell sx={{ color: 'black' }} align="right">
                内容
              </TableCell>
              <TableCell sx={{ color: 'black' }} align="right">
                作成日時
              </TableCell>
              <TableCell sx={{ color: 'black' }} align="right">
                操作
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formattedDateList.map((blog: PostItem) => (
              <TableRow key={blog.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row" sx={{ color: 'black' }}>
                  {blog.title}
                </TableCell>
                <TableCell align="right" sx={{ color: 'black' }}>
                  {blog.description}
                </TableCell>
                <TableCell align="right" sx={{ color: 'black' }}>
                  {blog.DateTime}
                </TableCell>
                <TableCell align="right" sx={{ color: 'black' }}>
                  <Link href={`/blog/edit/${blog.id}`}>編集</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainContainer>
  );
}
