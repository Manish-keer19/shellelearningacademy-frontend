import { useState, useEffect } from "react";
import { DashboardLayout } from "@/ems/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Plus,
  Phone,
  Mail,
  MoreVertical,
  TrendingUp,
  Users,
  Target,
  CheckCircle,
  Loader2,
  UserPlus,
  ArrowRightLeft
} from "lucide-react";
import { cn } from "@/ems/lib/utils";
import emsService from "@/service/ems.service";
import { useToast } from "@/hooks/use-toast";
import { useSelector } from "react-redux";

const Leads = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modals state
  const [isHbOpen, setIsHbOpen] = useState(false); // Create Lead
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  // @ts-ignore
  const { user } = useSelector((state: any) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    description: "",
    assignedTo: "",
  });

  const [assigneeId, setAssigneeId] = useState("");
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    fetchLeads();
    // Only fetch staff if user is Admin or Manager
    if (user?.accountType === "Super Admin" || user?.accountType === "Manager") {
      fetchStaff();
    }
  }, [user]);

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const response = await emsService.getAllLeads();
      if (response.success) {
        setLeads(response.leads);
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStaff = async () => {
    try {
      const response = await emsService.getAllStaff();
      if (response.success) {
        setStaff(response.users);
      }
    } catch (error) {
      console.error("Error fetching staff:", error);
    }
  };

  const handleCreateLead = async () => {
    if (!formData.name || !formData.mobile || !formData.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Handle "unassigned" value
      const payload = { ...formData };
      if (payload.assignedTo === "unassigned") {
        delete payload.assignedTo;
      }

      const response = await emsService.createLead(payload);
      if (response.success) {
        toast({
          title: "Success",
          description: "Lead created successfully",
        });
        setIsHbOpen(false);
        setFormData({ name: "", mobile: "", email: "", description: "", assignedTo: "" });
        fetchLeads();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create lead",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAssignLead = async () => {
    if (!assigneeId || !selectedLead) return;

    setIsSubmitting(true);
    try {
      const response = await emsService.updateLead(selectedLead._id, { assignedTo: assigneeId });
      if (response.success) {
        toast({
          title: "Success",
          description: `Lead assigned to ${response.lead.assignedTo?.fullName}`,
        });
        setIsAssignOpen(false);
        fetchLeads();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to assign lead",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (!newStatus || !selectedLead) return;

    setIsSubmitting(true);
    try {
      const response = await emsService.updateLead(selectedLead._id, { status: newStatus });
      if (response.success) {
        toast({
          title: "Status Updated",
          description: `Lead marked as ${newStatus}`,
        });
        setIsStatusOpen(false);
        fetchLeads();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false);
    }
  }

  const openAssignModal = (lead: any) => {
    setSelectedLead(lead);
    setAssigneeId(lead.assignedTo?._id || "");
    setIsAssignOpen(true);
  };

  const openStatusModal = (lead: any) => {
    setSelectedLead(lead);
    setNewStatus(lead.status);
    setIsStatusOpen(true);
  }

  const kpis = [
    { label: "Total Leads", value: leads.length.toString(), icon: Users, change: "Total" },
    { label: "New Leads", value: leads.filter(l => l.status === "New").length.toString(), icon: TrendingUp, change: "Needs Action" },
    { label: "Won", value: leads.filter(l => l.status === "Converted").length.toString(), icon: CheckCircle, change: "Success" },
    { label: "Lost", value: leads.filter(l => l.status === "Lost").length.toString(), icon: Target, change: "Terminated" },
  ];

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Leads & Sales</h1>
          <p className="text-muted-foreground mt-1">
            {user?.accountType === "Employee"
              ? "View and manage leads assigned to you"
              : "Track and manage your sales pipeline"
            }
          </p>
        </div>

        {/* Only show Add Lead button for Managers and Super Admins */}
        {(user?.accountType === "Super Admin" || user?.accountType === "Manager") && (
          <Dialog open={isHbOpen} onOpenChange={setIsHbOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Lead
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Lead</DialogTitle>
                <DialogDescription>Enter lead details below.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">Email</Label>
                  <Input
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="mobile" className="text-right">Mobile</Label>
                  <Input
                    id="mobile"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="desc" className="text-right">Description</Label>
                  <Textarea
                    id="desc"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="col-span-3"
                  />
                </div>

                {/* Assign to Employee (Only for Admin/Manager) */}
                {(user?.accountType === "Super Admin" || user?.accountType === "Manager") && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="assign" className="text-right">Assign To</Label>
                    <Select
                      value={formData.assignedTo}
                      onValueChange={(val) => setFormData({ ...formData, assignedTo: val })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select staff member..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unassigned">Unassigned</SelectItem>
                        {staff.map((s) => (
                          <SelectItem key={s._id} value={s._id}>
                            {s.fullName} ({s.accountType})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button onClick={handleCreateLead} disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create Lead
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Assign Modal */}
        <Dialog open={isAssignOpen} onOpenChange={setIsAssignOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign Lead</DialogTitle>
              <DialogDescription>Assign this lead to a team member.</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Label className="mb-2 block">Select Team Member</Label>
              <Select value={assigneeId} onValueChange={setAssigneeId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select staff..." />
                </SelectTrigger>
                <SelectContent>
                  {staff.map((s) => (
                    <SelectItem key={s._id} value={s._id}>
                      {s.fullName} ({s.accountType})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button onClick={handleAssignLead} disabled={isSubmitting}>
                {isSubmitting ? "Assigning..." : "Assign"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Status Modal */}
        <Dialog open={isStatusOpen} onOpenChange={setIsStatusOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Status</DialogTitle>
              <DialogDescription>Change the current stage of this lead.</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Label className="mb-2 block">Status</Label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Contacted">Contacted</SelectItem>
                  <SelectItem value="Interested">Interested</SelectItem>
                  <SelectItem value="Converted">Converted</SelectItem>
                  <SelectItem value="Lost">Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button onClick={handleStatusUpdate} disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Status"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {kpis.map((kpi, index) => (
          <div
            key={kpi.label}
            className="bg-card rounded-xl border border-border p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="kpi-icon w-8 h-8">
                <kpi.icon className="w-4 h-4" />
              </div>
              <span className="text-xs text-primary font-medium">
                {kpi.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Leads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leads.length === 0 ? (
          <div className="col-span-full text-center py-10 text-muted-foreground">
            No leads found.
            {user?.accountType === "Employee" ? " You have no assigned leads." : " Create one to get started."}
          </div>
        ) : (
          leads.map((lead, index) => (
            <div
              key={lead._id}
              className="bg-card rounded-xl border border-border p-5 hover:border-primary/30 hover:shadow-md transition-all animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-foreground">{lead.name}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-1" title={lead.description}>{lead.description || "No description"}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "status-badge text-xs px-2 py-0.5 rounded cursor-pointer hover:opacity-80",
                      lead.status === "New" && "status-active",
                      lead.status === "Contacted" && "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
                      lead.status === "Interested" && "status-warning",
                      lead.status === "Converted" && "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
                      lead.status === "Lost" && "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
                    )}
                    onClick={() => openStatusModal(lead)}
                    title="Click to update status"
                  >
                    {lead.status}
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  {lead.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  {lead.mobile}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  {lead.assignedTo ? (
                    <>
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={lead.assignedTo.image} />
                        <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                          {lead.assignedTo.fullName ? lead.assignedTo.fullName[0] : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">
                        {lead.assignedTo.fullName}
                      </span>
                    </>
                  ) : (
                    <span className="text-xs text-muted-foreground italic">Unassigned</span>
                  )}
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openStatusModal(lead)}>
                    <ArrowRightLeft className="w-3.5 h-3.5" />
                  </Button>
                  {(user?.accountType === "Super Admin" || user?.accountType === "Manager") && (
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openAssignModal(lead)}>
                      <UserPlus className="w-3.5 h-3.5" />
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="outline" className="flex-1 w-full" onClick={() => openStatusModal(lead)}>
                  Update Progress
                </Button>
              </div>
            </div>
          )))}
      </div>
    </DashboardLayout>
  );
};

export default Leads;
