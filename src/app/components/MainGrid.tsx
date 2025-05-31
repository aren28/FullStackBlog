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

import { PostType } from '@/types';

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
    backgroundImage: 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    backgroundRepeat: 'no-repeat',
  },
}));

export default function MainGrid({ formattedDateList }: { formattedDateList: PostType[] }) {
  return (
    <MainContainer sx={{ width: '100%', height: '100vh', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* cards */}
      <TableContainer component={Paper} sx={{ color: 'white', background: 'transparent' }}>
        <Table sx={{ minWidth: '1000px', background: 'transparent' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>タイトル</TableCell>
              <TableCell sx={{ color: 'white' }} align="right">
                内容
              </TableCell>
              <TableCell sx={{ color: 'white' }} align="right">
                作成日時
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formattedDateList.map((blog: PostType) => (
              <TableRow key={blog.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row" sx={{ color: 'white' }}>
                  {blog.title}
                </TableCell>
                <TableCell align="right" sx={{ color: 'white' }}>
                  {blog.description}
                </TableCell>
                <TableCell align="right" sx={{ color: 'white' }}>
                  {blog.DateTime}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainContainer>
  );
}
