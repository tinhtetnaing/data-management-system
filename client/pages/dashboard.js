import { OverviewAnalyticsView as DashboardView } from '../sections/overview/view';
import { DashboardLayout } from '../layouts/dashboard';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardView />
    </DashboardLayout>
  );
}