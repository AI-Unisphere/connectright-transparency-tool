import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

const VendorRFPList = () => {
  const navigate = useNavigate();
  console.log("Rendering VendorRFPList");

  // Mock RFP data
  const rfps = [
    {
      id: 1,
      title: "School Network Infrastructure",
      region: "North",
      budget: "$50,000",
      category: "Network",
      deadline: "2024-04-01",
    },
    {
      id: 2,
      title: "Healthcare Center Connectivity",
      region: "South",
      budget: "$75,000",
      category: "Connectivity",
      deadline: "2024-04-15",
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Available RFPs</h1>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rfps.map((rfp) => (
              <TableRow key={rfp.id}>
                <TableCell>{rfp.title}</TableCell>
                <TableCell>{rfp.region}</TableCell>
                <TableCell>{rfp.budget}</TableCell>
                <TableCell>{rfp.category}</TableCell>
                <TableCell>{rfp.deadline}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/vendor/rfps/${rfp.id}`)}
                  >
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

export default VendorRFPList;