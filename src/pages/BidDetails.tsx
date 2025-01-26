import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Download, Building2, Mail, Calendar, FileText } from "lucide-react";

interface Bid {
  id: string;
  status: "DRAFT" | "SUBMITTED";
  submissionDate: string;
  vendor: {
    id: string;
    name: string;
    businessName: string;
    businessEmail: string;
  };
  rfp: {
    id: string;
    title: string;
    submissionDeadline: string;
  };
}

export default function BidDetails() {
  const { rfpId, bidId } = useParams();
  const [bid, setBid] = useState<Bid | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchBidDetails = async () => {
      try {
        const response = await api.get(`/bids/rfp/${rfpId}/bid/${bidId}`);
        setBid(response.data.data);
      } catch (error: any) {
        toast({
          title: "Error fetching bid details",
          description: error.response?.data?.message || "Unable to retrieve bid details",
          variant: "destructive",
        });
        navigate(`/bids`);
      } finally {
        setLoading(false);
      }
    };

    fetchBidDetails();
  }, [rfpId, bidId, navigate, toast]);

  const handleDownload = async () => {
    try {
      const response = await api.get(`/bids/rfp/${rfpId}/bid/${bidId}/document`, {
        responseType: "blob",
      });
      
      // Create a download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `bid-${bidId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      toast({
        title: "Error downloading bid",
        description: error.response?.data?.message || "Unable to download bid document",
        variant: "destructive",
      });
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!bid) {
    return (
      <Alert variant="destructive">
        <AlertDescription>No bid data available.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bid Details</h1>
          <p className="text-muted-foreground mt-2">
            View detailed information about this bid
          </p>
        </div>
        <Button onClick={() => navigate("/bids")}>Back to Bids</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>RFP Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">Title</h3>
              <p className="text-muted-foreground">{bid.rfp.title}</p>
            </div>
            <div>
              <h3 className="font-semibold">Submission Deadline</h3>
              <p className="text-muted-foreground">
                {formatDate(bid.rfp.submissionDeadline)}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vendor Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-semibold">{bid.vendor.businessName}</p>
                  <p className="text-sm text-muted-foreground">{bid.vendor.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <p className="text-muted-foreground">{bid.vendor.businessEmail}</p>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Submitted on</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(bid.submissionDate)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bid Document</CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full"
                onClick={handleDownload}
              >
                <FileText className="h-4 w-4 mr-2" />
                Download Proposal
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 