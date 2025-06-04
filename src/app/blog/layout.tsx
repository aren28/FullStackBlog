import SideMenu from '../components/SideMenu';
import { ReactNode } from 'react';
import Box from '@mui/material/Box';

interface BlogLayoutProps {
  children: ReactNode;
}

const BlogLayout = ({ children }: BlogLayoutProps) => {
  return (
    <>
      <SideMenu />
      <Box
        component={'main'}
        sx={{
          pl: '240px',
          width: '100vw',
          height: '100vh',
          background: 'linear-gradient(90deg, #40826D 0%, #98FBCB 100%)',
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default BlogLayout;
