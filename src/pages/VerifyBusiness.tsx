import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const VerifyBusiness = () => {
  const { token } = useParams(); // Get the token from the URL
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const verifyBusiness = async () => {
      try {
        await axios.get(`http://localhost:3000/vendor/verification/verify/${token}`);
        toast({
          title: "Verification Successful",
          description: "Your business has been successfully verified.",
        });
        navigate("/login"); // Redirect to login after successful verification
      } catch (error) {
        toast({
          title: "Verification Failed",
          description: "The verification link is invalid or has expired.",
          variant: "destructive",
        });
        navigate("/"); // Redirect to home on failure
      }
    };

    verifyBusiness();
  }, [token, navigate, toast]);

  return <div>Verifying your business...</div>; // You can replace this with a loading spinner or skeleton
};

export default VerifyBusiness; 