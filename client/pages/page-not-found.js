import { DashboardLayout } from '../layouts/dashboard';
import { NotFoundView } from '../sections/error';
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
        <title>404 Page Not Found | Data Management System</title>
      </Head>
      <DashboardLayout>
        <NotFoundView />
      </DashboardLayout>
    </>
  );
}
