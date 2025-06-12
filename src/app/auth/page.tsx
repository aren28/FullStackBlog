import { redirect } from 'next/navigation';

export default async function Auth() {
  return redirect('/auth/login');
}
