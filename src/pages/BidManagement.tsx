import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FileText, Download, ChevronRight } from "lucide-react";

interface RFP {
  id: string;
  title: string;
  submissionDeadline: string;
  status: "DRAFT" | "PUBLISHED" | "CLOSED";
  bids: Bid[];
}

interface Bid {
  id: string;
  status: "SUBMITTED";
  submissionDate: string;
  vendor: {
    id: string;
    name: string;
    businessName: string;
    businessEmail: string;
  };
}

interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export default function BidManagement() {
  const [rfps, setRfps] = useState<RFP[]>([]);
  const [selectedRfp, setSelectedRfp] = useState<string | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationData>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  // Fetch RFPs
  useEffect(() => {
    const fetchRFPs = async () => {
      try {
        const response = await api.get("/rfp/list", {
          params: {
            status: "PUBLISHED,CLOSED",
          },
        });
        setRfps(response.data.data);
      } catch (error: any) {
        toast({
          title: "Error fetching RFPs",
          description: error.response?.data?.message || "Unable to fetch RFPs",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRFPs();
  }, [toast]);

  // Fetch bids when an RFP is selected
  useEffect(() => {
    const fetchBids = async () => {
      if (!selectedRfp) return;

      try {
        setLoading(true);
        const response = await api.get(`/bids/rfp/${selectedRfp}/list`);
        setBids(response.data.data);
        setPagination(response.data.pagination);
      } catch (error: any) {
        toast({
          title: "Error fetching bids",
          description: error.response?.data?.message || "Unable to fetch bids",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBids();
  }, [selectedRfp, toast]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDownloadBid = async (rfpId: string, bidId: string) => {
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

  const handleViewBidDetails = (rfpId: string, bidId: string) => {
    navigate(`/rfp/${rfpId}/bid/${bidId}`);
  };

  if (loading && !selectedRfp) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bid Management</h1>
        <p className="text-muted-foreground mt-2">
          View and manage bids for all RFPs
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Select RFP</CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={selectedRfp || ""}
            onValueChange={(value) => setSelectedRfp(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an RFP to view bids" />
            </SelectTrigger>
            <SelectContent>
              {rfps.map((rfp) => (
                <SelectItem key={rfp.id} value={rfp.id}>
                  {rfp.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {selectedRfp && (
        <Card>
          <CardHeader>
            <CardTitle>Bids</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : bids.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No bids have been submitted for this RFP yet.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Business Name</TableHead>
                    <TableHead>Submission Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bids.map((bid) => (
                    <TableRow key={bid.id}>
                      <TableCell>{bid.vendor.name}</TableCell>
                      <TableCell>{bid.vendor.businessName}</TableCell>
                      <TableCell>{formatDate(bid.submissionDate)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDownloadBid(selectedRfp, bid.id)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleViewBidDetails(selectedRfp, bid.id)}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
} 