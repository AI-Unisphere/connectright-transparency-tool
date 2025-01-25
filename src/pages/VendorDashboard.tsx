import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Package, CheckCircle, Eye, PlusCircle } from "lucide-react";

const VendorDashboard = () => {
  const navigate = useNavigate();
  console.log("Rendering VendorDashboard");

  // Mock data for dashboard
  const stats = {
    submittedBids: 12,
    ongoingProjects: 5,
    contractsAwarded: 8,
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Vendor Dashboard</h1>
      
      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Submitted Bids</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.submittedBids}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Ongoing Projects</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.ongoingProjects}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Contracts Awarded</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.contractsAwarded}</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4 mb-8">
        <Button
          onClick={() => navigate("/vendor/rfps")}
          className="flex items-center gap-2"
        >
          <Eye className="h-4 w-4" />
          View Available RFPs
        </Button>
        <Button
          onClick={() => navigate("/vendor/bid/new")}
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Submit New Bid
        </Button>
      </div>
    </div>
  );
};

export default VendorDashboard;