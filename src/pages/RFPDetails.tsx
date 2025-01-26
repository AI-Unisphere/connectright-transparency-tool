import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ExternalLink, Clock, CheckCircle2, FileText } from "lucide-react";

interface RFP {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  budget: number;
  timelineStartDate: string;
  timelineEndDate: string;
  submissionDeadline: string;
  status: "DRAFT" | "PUBLISHED" | "CLOSED";
  isPublished: boolean;
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
  creationTxHash?: string;
  publishTxHash?: string;
}

export default function RFPDetails() {
  const { id } = useParams();
  const [rfp, setRfp] = useState<RFP | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchRFPDetails = async () => {
      try {
        const response = await api.get(`/rfp/${id}`);
        setRfp(response.data.data);
      } catch (error: any) {
        toast({
          title: "Error fetching RFP details",
          description: error.response?.data?.message || "Unable to retrieve RFP details",
          variant: "destructive",
        });
        navigate("/rfp");
      } finally {
        setLoading(false);
      }
    };

    fetchRFPDetails();
  }, [id, navigate, toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!rfp) {
    return (
      <Alert variant="destructive">
        <AlertDescription>No RFP data available.</AlertDescription>
      </Alert>
    );
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DRAFT':
        return 'bg-yellow-500';
      case 'PUBLISHED':
        return 'bg-green-500';
      case 'CLOSED':
        return 'bg-gray-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{rfp.title}</h1>
          <p className="text-muted-foreground mt-2">{rfp.shortDescription}</p>
        </div>
        <Badge className={getStatusColor(rfp.status)}>{rfp.status}</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>RFP Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Description</h3>
              <div className="whitespace-pre-wrap text-muted-foreground">
                {rfp.longDescription}
              </div>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Budget</h3>
                <p className="text-muted-foreground">{formatCurrency(rfp.budget)}</p>
              </div>
              <div>
                <h3 className="font-semibold">Category</h3>
                <p className="text-muted-foreground">{rfp.category.name}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Project Timeline
                </h3>
                <p className="text-sm text-muted-foreground">
                  {formatDate(rfp.timelineStartDate)} - {formatDate(rfp.timelineEndDate)}
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Submission Deadline</h3>
                <p className="text-sm text-muted-foreground">
                  {formatDate(rfp.submissionDeadline)}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Blockchain Timeline</CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              <div className="space-y-6">
                <div className="relative pl-8">
                  <div className="absolute left-0 w-4 h-4 bg-green-500 rounded-full"></div>
                  <h3 className="font-semibold flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Created
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {formatDate(rfp.createdAt)}
                  </p>
                  {rfp.creationTxHash && (
                    <a
                      href={`https://sepolia.etherscan.io/tx/${rfp.creationTxHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-500 hover:underline flex items-center gap-1"
                    >
                      View on Etherscan
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>

                {rfp.isPublished && (
                  <div className="relative pl-8">
                    <div className="absolute left-0 w-4 h-4 bg-green-500 rounded-full"></div>
                    <h3 className="font-semibold flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      Published
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {formatDate(rfp.updatedAt)}
                    </p>
                    {rfp.publishTxHash && (
                      <a
                        href={`https://sepolia.etherscan.io/tx/${rfp.publishTxHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-500 hover:underline flex items-center gap-1"
                      >
                        View on Etherscan
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 