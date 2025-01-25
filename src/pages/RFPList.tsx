import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockRFPs = [
  {
    id: 1,
    title: "Network Infrastructure Upgrade",
    status: "Active",
    deadline: "2024-04-15",
    budget: "$500,000",
    submissions: 8,
  },
  {
    id: 2,
    title: "School Connectivity Project",
    status: "Closed",
    deadline: "2024-03-30",
    budget: "$750,000",
    submissions: 12,
  },
  {
    id: 3,
    title: "Rural Healthcare Network Extension",
    status: "Draft",
    deadline: "2024-05-01",
    budget: "$300,000",
    submissions: 0,
  },
];

const RFPList = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredRFPs = mockRFPs.filter(
    (rfp) => statusFilter === "all" || rfp.status.toLowerCase() === statusFilter
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">RFP Management</h1>
        <Button onClick={() => navigate("/rfp/create")}>Create New RFP</Button>
      </div>

      <div className="mb-6">
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All RFPs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Title</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Deadline</th>
                  <th className="text-left py-3 px-4">Budget</th>
                  <th className="text-left py-3 px-4">Submissions</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRFPs.map((rfp) => (
                  <tr key={rfp.id} className="border-b">
                    <td className="py-3 px-4">{rfp.title}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          rfp.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : rfp.status === "Closed"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {rfp.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">{rfp.deadline}</td>
                    <td className="py-3 px-4">{rfp.budget}</td>
                    <td className="py-3 px-4">{rfp.submissions}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/rfp/${rfp.id}`)}
                        >
                          View Details
                        </Button>
                        {rfp.status === "Active" && (
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => {
                              // Mock close RFP action
                              console.log("Closing RFP:", rfp.id);
                            }}
                          >
                            Close RFP
                          </Button>
                        )}
                      </div>
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

export default RFPList;