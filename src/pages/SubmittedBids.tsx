import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

const SubmittedBids = () => {
  console.log("Rendering SubmittedBids");

  // Mock submitted bids data
  const bids = [
    {
      id: 1,
      rfpTitle: "School Network Infrastructure",
      submittedDate: "2024-03-01",
      status: "Pending",
      cost: "$45,000",
      timeline: "3 months",
    },
    {
      id: 2,
      rfpTitle: "Healthcare Center Connectivity",
      submittedDate: "2024-02-15",
      status: "Evaluated",
      cost: "$70,000",
      timeline: "4 months",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "evaluated":
        return "bg-blue-100 text-blue-800";
      case "awarded":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Submitted Bids</h1>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>RFP Title</TableHead>
              <TableHead>Submitted Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead>Timeline</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bids.map((bid) => (
              <TableRow key={bid.id}>
                <TableCell>{bid.rfpTitle}</TableCell>
                <TableCell>{bid.submittedDate}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(bid.status)}>
                    {bid.status}
                  </Badge>
                </TableCell>
                <TableCell>{bid.cost}</TableCell>
                <TableCell>{bid.timeline}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SubmittedBids;