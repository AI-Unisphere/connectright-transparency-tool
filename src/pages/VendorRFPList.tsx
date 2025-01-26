import React, { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const VendorRFPList = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  console.log("Rendering VendorRFPList with filters:", { selectedCategory, selectedStatus });

  // Mock categories
  const categories = [
    { id: "1", name: "Network" },
    { id: "2", name: "Connectivity" },
    { id: "3", name: "Hardware" },
  ];

  // Mock statuses
  const statuses = ["Open", "Closing Soon", "Closed"];

  // Mock RFP data
  const allRfps = [
    {
      id: 1,
      title: "School Network Infrastructure",
      region: "North",
      budget: "$50,000",
      category: "Network",
      status: "Open",
      deadline: "2024-04-01",
    },
    {
      id: 2,
      title: "Healthcare Center Connectivity",
      region: "South",
      budget: "$75,000",
      category: "Connectivity",
      status: "Closing Soon",
      deadline: "2024-04-15",
    },
    {
      id: 3,
      title: "Server Hardware Upgrade",
      region: "Central",
      budget: "$100,000",
      category: "Hardware",
      status: "Closed",
      deadline: "2024-03-15",
    },
  ];

  // Filter RFPs based on selected category and status
  const filteredRfps = allRfps.filter((rfp) => {
    const categoryMatch = selectedCategory === "all" || rfp.category === selectedCategory;
    const statusMatch = selectedStatus === "all" || rfp.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

  console.log("Filtered RFPs:", filteredRfps);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Available RFPs</h1>

      <div className="flex gap-4 mb-6">
        <div className="w-48">
          <Select
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-48">
          <Select
            value={selectedStatus}
            onValueChange={(value) => setSelectedStatus(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRfps.map((rfp) => (
              <TableRow key={rfp.id}>
                <TableCell>{rfp.title}</TableCell>
                <TableCell>{rfp.region}</TableCell>
                <TableCell>{rfp.budget}</TableCell>
                <TableCell>{rfp.category}</TableCell>
                <TableCell>{rfp.status}</TableCell>
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