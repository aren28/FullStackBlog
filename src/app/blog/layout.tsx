import SideMenu from '@/components/SideMenu';
import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

interface BlogLayoutProps {
  children: ReactNode;
}

export default async function BlogLayout({ children }: BlogLayoutProps): Promise<ReactNode> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  if (!user.email || !user.id) {
    return redirect('/login');
  }

  return (
    <>
      <SideMenu user={user.email} />
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
}
