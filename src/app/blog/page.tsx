import { createClient } from '@/utils/supabase/server';
import BlogMainClient from '@/components/BlogMainClient';

export default async function BlogMain() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <BlogMainClient user={{ email: user?.email, id: user?.id }} />;
}
