import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { PlusCircle, FileText, CheckCircle, Clock, Plus, List } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const summaryData = {
    totalRFPs: 24,
    activeBids: 12,
    completedProjects: 8,
  };

  // Mock categories data
  const categories = [
    { id: 1, name: "IT Infrastructure" },
    { id: 2, name: "Network Equipment" },
    { id: 3, name: "Software Licenses" },
    { id: 4, name: "Consulting Services" },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Procurement Officer Dashboard</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <List className="h-4 w-4" />
              Manage Categories
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>RFP Categories</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <div className="space-y-4">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center justify-between p-2 bg-accent/10 rounded-md">
                    <span>{category.name}</span>
                  </div>
                ))}
                <Button className="w-full flex items-center gap-2" variant="outline">
                  <Plus className="h-4 w-4" />
                  Add New Category
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total RFPs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.totalRFPs}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Bids</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.activeBids}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed Projects</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryData.completedProjects}</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Button onClick={() => navigate("/rfp/create")} className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Create New RFP
        </Button>
        <Button variant="secondary" onClick={() => navigate("/rfp/bids")} className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          View All Bids
        </Button>
      </div>

      {/* Recent RFPs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent RFPs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Title</th>
                  <th className="text-left py-3 px-4">Category</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Deadline</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    id: 1,
                    title: "Network Infrastructure Upgrade",
                    category: "IT Infrastructure",
                    status: "Active",
                    deadline: "2024-04-15",
                  },
                  {
                    id: 2,
                    title: "School Connectivity Project",
                    category: "Network Equipment",
                    status: "Closed",
                    deadline: "2024-03-30",
                  },
                ].map((rfp) => (
                  <tr key={rfp.id} className="border-b">
                    <td className="py-3 px-4">{rfp.title}</td>
                    <td className="py-3 px-4">{rfp.category}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          rfp.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {rfp.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">{rfp.deadline}</td>
                    <td className="py-3 px-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/rfp/${rfp.id}`)}
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;