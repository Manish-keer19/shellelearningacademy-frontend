import { DashboardLayout } from "@/ems/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Target, TrendingUp, Award, IndianRupee } from "lucide-react";
import { cn } from "@/ems/lib/utils";

const targets = [
  {
    id: 1,
    employee: {
      name: "Priya Sharma",
      role: "Sales Manager",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
    },
    target: 500000,
    achieved: 420000,
    commission: 21000,
  },
  {
    id: 2,
    employee: {
      name: "Rahul Kumar",
      role: "Sales Executive",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rahul",
    },
    target: 300000,
    achieved: 285000,
    commission: 14250,
  },
  {
    id: 3,
    employee: {
      name: "Anita Patel",
      role: "Sales Executive",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=anita",
    },
    target: 300000,
    achieved: 198000,
    commission: 9900,
  },
  {
    id: 4,
    employee: {
      name: "Vikram Singh",
      role: "Senior Sales",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=vikram",
    },
    target: 400000,
    achieved: 380000,
    commission: 19000,
  },
];

const Targets = () => {
  const totalTarget = targets.reduce((sum, t) => sum + t.target, 0);
  const totalAchieved = targets.reduce((sum, t) => sum + t.achieved, 0);
  const totalCommission = targets.reduce((sum, t) => sum + t.commission, 0);
  const overallProgress = (totalAchieved / totalTarget) * 100;

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Targets & Commissions
          </h1>
          <p className="text-muted-foreground mt-1">
            Track sales targets and commission payouts
          </p>
        </div>
        <Button className="gap-2">
          <Target className="w-4 h-4" />
          Set Targets
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-card rounded-xl border border-border p-5 col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="kpi-icon">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Overall Progress</p>
              <p className="text-2xl font-bold text-foreground">
                {overallProgress.toFixed(1)}%
              </p>
            </div>
          </div>
          <Progress value={overallProgress} className="h-3" />
          <div className="flex justify-between mt-3 text-sm">
            <span className="text-muted-foreground">
              Achieved: ₹{(totalAchieved / 100000).toFixed(1)}L
            </span>
            <span className="text-muted-foreground">
              Target: ₹{(totalTarget / 100000).toFixed(1)}L
            </span>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="kpi-icon">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">
            ₹{(totalCommission / 1000).toFixed(1)}K
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Total Commissions
          </p>
        </div>

        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="kpi-icon">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {targets.filter((t) => t.achieved / t.target >= 0.9).length}
          </p>
          <p className="text-sm text-muted-foreground mt-1">On Target (90%+)</p>
        </div>
      </div>

      {/* Individual Targets */}
      <div className="bg-card rounded-xl border border-border">
        <div className="p-6 border-b border-border">
          <h3 className="section-header">Individual Performance</h3>
        </div>
        <div className="divide-y divide-border">
          {targets.map((item, index) => {
            const progress = (item.achieved / item.target) * 100;
            const remaining = item.target - item.achieved;

            return (
              <div
                key={item.id}
                className="p-6 hover:bg-muted/30 transition-colors animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={item.employee.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {item.employee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">
                      {item.employee.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {item.employee.role}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">
                      ₹{(item.commission / 1000).toFixed(1)}K
                    </p>
                    <p className="text-xs text-muted-foreground">Commission</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Achieved: ₹{(item.achieved / 1000).toFixed(0)}K
                    </span>
                    <span
                      className={cn(
                        "font-medium",
                        progress >= 90 ? "text-success" : progress >= 70 ? "text-warning" : "text-destructive"
                      )}
                    >
                      {progress.toFixed(0)}%
                    </span>
                  </div>
                  <Progress
                    value={progress}
                    className={cn(
                      "h-2",
                      progress >= 90 && "[&>div]:bg-success",
                      progress >= 70 && progress < 90 && "[&>div]:bg-warning",
                      progress < 70 && "[&>div]:bg-destructive"
                    )}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Remaining: ₹{(remaining / 1000).toFixed(0)}K</span>
                    <span>Target: ₹{(item.target / 1000).toFixed(0)}K</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Targets;
