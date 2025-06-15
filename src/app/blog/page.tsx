import { createClient } from '@/utils/supabase/server';
import BlogMainClient from '@/components/BlogMainClient';
import { redirect } from 'next/navigation';

export default async function BlogMain() {
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

  return <BlogMainClient user={{ email: user.email, id: user.id }} />;
}
