import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { FileText, Package, CheckCircle, Eye, PlusCircle, Clock, FileCheck, Award } from "lucide-react";

const VendorDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  console.log("Rendering VendorDashboard");

  // Verification state
  const [showVerificationModal, setShowVerificationModal] = useState(true);
  const [businessRegNumber, setBusinessRegNumber] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  // Mock data
  const stats = {
    submittedBids: 12,
    ongoingProjects: 5,
    contractsAwarded: 8,
  };

  const activeBids = [
    { id: 1, title: "Network Infrastructure", status: "Under Review", deadline: "2024-04-15" },
    { id: 2, title: "Software Licenses", status: "Submitted", deadline: "2024-04-20" },
  ];

  const awardedContracts = [
    { 
      id: 1, 
      title: "Cloud Migration", 
      progress: 75,
      nextMilestone: "Data Migration Phase",
      dueDate: "2024-05-01"
    },
    { 
      id: 2, 
      title: "Security Audit", 
      progress: 40,
      nextMilestone: "Network Assessment",
      dueDate: "2024-04-25"
    },
  ];

  const handleVerificationSubmit = () => {
    console.log("Submitting verification for:", businessRegNumber);
    // Mock API call
    if (businessRegNumber.trim()) {
      toast({
        title: "Verification Requested",
        description: "Verification email has been sent to your registered business email.",
      });
      setIsVerified(true);
      setShowVerificationModal(false);
    } else {
      toast({
        title: "Error",
        description: "Please enter a valid business registration number",
        variant: "destructive",
      });
    }
  };

  if (!isVerified) {
    return (
      <AlertDialog open={showVerificationModal} onOpenChange={setShowVerificationModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Business Verification Required</AlertDialogTitle>
            <AlertDialogDescription>
              Please enter your business registration number to verify your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="my-4">
            <Input
              placeholder="Business Registration Number"
              value={businessRegNumber}
              onChange={(e) => setBusinessRegNumber(e.target.value)}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => navigate("/")}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleVerificationSubmit}>Verify Business</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

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
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.contractsAwarded}</div>
          </CardContent>
        </Card>
      </div>

      {/* Active Bids Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Active Bids</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeBids.map((bid) => (
              <div key={bid.id} className="flex items-center justify-between p-4 bg-accent/10 rounded-lg">
                <div>
                  <h3 className="font-semibold">{bid.title}</h3>
                  <p className="text-sm text-muted-foreground">Status: {bid.status}</p>
                  <p className="text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 inline mr-1" />
                    Deadline: {bid.deadline}
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate(`/vendor/bids/${bid.id}`)}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Awarded Contracts Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Awarded Contracts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {awardedContracts.map((contract) => (
              <div key={contract.id} className="p-4 bg-accent/10 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{contract.title}</h3>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm">
                        <FileCheck className="h-4 w-4 mr-2" />
                        Update Progress
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>{contract.title} - Progress Update</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6 space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Next Milestone</h4>
                          <p>{contract.nextMilestone}</p>
                          <p className="text-sm text-muted-foreground">Due: {contract.dueDate}</p>
                        </div>
                        <Button className="w-full" onClick={() => toast({ title: "Progress Updated", description: "Your progress has been saved successfully." })}>
                          Save Progress
                        </Button>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${contract.progress}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Progress: {contract.progress}%
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

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