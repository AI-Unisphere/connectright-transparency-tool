import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface RFP {
  id: string;
  title: string;
  shortDescription: string;
  budget: number;
  issueDate: string | null;
  submissionDeadline: string;
  timelineStartDate: string;
  timelineEndDate: string;
  status: "DRAFT" | "PUBLISHED" | "CLOSED";
  category: {
    id: string;
    name: string;
  };
  createdBy: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export default function RFPList() {
  const [rfps, setRfps] = useState<RFP[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchRFPs = async (page: number = 1, status?: string) => {
    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', '10');
      if (status && status !== 'all') {
        params.append('status', status.toUpperCase());
      }

      const response = await api.get(`/rfp/list?${params.toString()}`);
      setRfps(response.data.data);
      setPagination(response.data.pagination);
    } catch (error: any) {
      toast({
        title: "Error fetching RFPs",
        description: error.response?.data?.message || "Unable to retrieve RFPs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRFPs(currentPage, statusFilter);
  }, [currentPage, statusFilter]);

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const formatBudget = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg">Loading RFPs...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Request for Proposals</h2>
          <p className="text-muted-foreground">
            Manage and track all RFPs in the platform
          </p>
        </div>
        <Button onClick={() => navigate("/rfp/create")}>Create New RFP</Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All RFPs</CardTitle>
            <Select value={statusFilter} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Title</th>
                  <th className="text-left py-3 px-4">Category</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Budget</th>
                  <th className="text-left py-3 px-4">Deadline</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rfps.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-4">
                      No RFPs found
                    </td>
                  </tr>
                ) : (
                  rfps.map((rfp) => (
                    <tr key={rfp.id} className="border-b">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{rfp.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {rfp.shortDescription}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">{rfp.category.name}</td>
                      <td className="py-3 px-4">
                        <span
                          className={cn(
                            "px-2 py-1 rounded-full text-xs font-medium",
                            {
                              "bg-yellow-100 text-yellow-800": rfp.status === "DRAFT",
                              "bg-green-100 text-green-800": rfp.status === "PUBLISHED",
                              "bg-gray-100 text-gray-800": rfp.status === "CLOSED",
                            }
                          )}
                        >
                          {rfp.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{formatBudget(rfp.budget)}</td>
                      <td className="py-3 px-4">{formatDate(rfp.submissionDeadline)}</td>
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
                  ))
                )}
              </tbody>
            </table>
          </div>

          {pagination && pagination.totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </Button>
              <span className="py-2 px-3 text-sm">
                Page {currentPage} of {pagination.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === pagination.totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}