import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

const RFPList = () => {
  const [rfps, setRfps] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchRFPs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/rfp/list", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Use the stored token
          },
        });
        setRfps(response.data); // Assuming the response contains the RFP data
      } catch (error) {
        toast({
          title: "Error fetching RFPs",
          description: "Unable to retrieve RFPs.",
          variant: "destructive",
        });
        navigate("/login"); // Redirect to login if there's an error
      } finally {
        setLoading(false);
      }
    };

    fetchRFPs();
  }, [navigate, toast]);

  const filteredRFPs = rfps.filter(
    (rfp) => statusFilter === "all" || rfp.status.toLowerCase() === statusFilter
  );

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or skeleton
  }

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