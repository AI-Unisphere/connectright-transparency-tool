import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const RFPDetails = () => {
  const { id } = useParams();
  const [rfp, setRfp] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchRFPDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/rfp/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Use the stored token
          },
        });
        setRfp(response.data); // Assuming the response contains the RFP data
      } catch (error) {
        toast({
          title: "Error fetching RFP details",
          description: "Unable to retrieve RFP details.",
          variant: "destructive",
        });
        navigate("/rfp"); // Redirect to RFP list if there's an error
      } finally {
        setLoading(false);
      }
    };

    fetchRFPDetails();
  }, [id, navigate, toast]);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or skeleton
  }

  if (!rfp) {
    return <div>No RFP data available.</div>; // Handle case where no RFP data is found
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">{rfp.title}</h1>
      <p>{rfp.shortDescription}</p>
      <p><strong>Budget:</strong> {rfp.budget}</p>
      <p><strong>Submission Deadline:</strong> {new Date(rfp.submissionDeadline).toLocaleString()}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default RFPDetails; 