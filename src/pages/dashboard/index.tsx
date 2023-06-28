import DashboardLayout from "@/layouts/DashboardLayout";
import { ReactNode } from "react";

const Dashboard = () => {
  return <></>;
};

Dashboard.getLayout = (page: ReactNode) => <></>;

Dashboard.authGuard = true;
Dashboard.getLayout = (page: ReactNode) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default Dashboard;
