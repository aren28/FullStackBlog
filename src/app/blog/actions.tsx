'use server';

import { createClient } from '@/utils/supabase/server';

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  console.log('signOut');
}
