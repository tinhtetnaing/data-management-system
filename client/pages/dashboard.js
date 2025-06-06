import { OverviewAnalyticsView as DashboardView } from '../sections/overview/view';
import { DashboardLayout } from '../layouts/dashboard';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Dashboard() {
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
        <title>Dashboard | Data Management System</title>
      </Head>
      <DashboardLayout>
        <DashboardView />
      </DashboardLayout>
    </>
  );
}