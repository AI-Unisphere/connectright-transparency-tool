import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const VerificationRequest = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      businessRegistrationNumber: "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("http://localhost:3000/vendor/verification/request", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Use the stored token
        },
      });
      toast({
        title: "Verification Request Submitted",
        description: "Your business registration number has been submitted for verification.",
      });
      navigate("/"); // Redirect to home or another relevant page
    } catch (error) {
      toast({
        title: "Verification Request Failed",
        description: "Please check your input and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Request Business Verification
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="businessRegistrationNumber" className="block text-sm font-medium text-gray-700">
                Business Registration Number
              </label>
              <div className="mt-1">
                <Input
                  id="businessRegistrationNumber"
                  name="businessRegistrationNumber"
                  type="text"
                  required
                  {...form.register("businessRegistrationNumber")}
                />
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Verification Request"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerificationRequest; 