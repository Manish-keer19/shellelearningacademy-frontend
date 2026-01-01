import { DashboardLayout } from "@/ems/components/layout/DashboardLayout";
import { KPICard } from "@/ems/components/dashboard/KPICard";
import { RevenueChart } from "@/ems/components/dashboard/RevenueChart";
import { PerformanceChart } from "@/ems/components/dashboard/PerformanceChart";
import { TopPerformers } from "@/ems/components/dashboard/TopPerformers";
import { PendingApprovals } from "@/ems/components/dashboard/PendingApprovals";
import { AttendanceOverview } from "@/ems/components/dashboard/AttendanceOverview";
import { Users, UserCheck, ListTodo, IndianRupee } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  // Redirect employees to leads page
  useEffect(() => {
    if (user?.accountType === "Employee") {
      navigate("/ems/leads", { replace: true });
    }
  }, [user, navigate]);

  // Get first name
  const firstName = user?.fullName ? user.fullName.split(" ")[0] : "User";

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back, {firstName}! Here's what's happening today.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Total Employees"
          value={156}
          icon={Users}
          change="+12 this month"
          changeType="positive"
        />
        <KPICard
          title="Present Today"
          value={142}
          icon={UserCheck}
          change="91.2% attendance"
          changeType="positive"
        />
        <KPICard
          title="Active Tasks"
          value={89}
          icon={ListTodo}
          change="24 due today"
          changeType="neutral"
        />
        <KPICard
          title="Monthly Revenue"
          value="₹9.5L"
          icon={IndianRupee}
          change="+18% vs last month"
          changeType="positive"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <RevenueChart />
        <PerformanceChart />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TopPerformers />
        <PendingApprovals />
        <AttendanceOverview />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
