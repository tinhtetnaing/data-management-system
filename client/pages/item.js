import { DashboardLayout } from '../layouts/dashboard';
import { ItemView } from '../sections/item/view';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

// ----------------------------------------------------------------------

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
      return;
    }
  });

  return (
    <>
      <Head>
        <title>Items | Data Management System</title>
      </Head>
      <DashboardLayout>
        <ItemView />
      </DashboardLayout>
    </>
  );
}
