import { DashboardLayout } from '../layouts/dashboard';
import { ItemView } from '../sections/item/view';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
      return;
    }})
  return (
    <>
    <DashboardLayout>
      <ItemView />
      </DashboardLayout>
    </>
  );
}
