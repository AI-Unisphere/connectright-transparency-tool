import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Wand2 } from "lucide-react";
import axios from "axios";

interface RFPFormData {
  title: string;
  description: string;
  budget: string;
  deadline: string;
  evaluationCriteria: string;
  startDate: string;
  endDate: string;
}

const CreateRFP = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const { register, handleSubmit, setValue } = useForm<RFPFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: RFPFormData) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("http://localhost:3000/rfp/create", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Use the stored token
        },
      });
      toast({
        title: "RFP Created",
        description: "Your RFP has been successfully published.",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "RFP Creation Failed",
        description: "Please check your input and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateDraft = async () => {
    setIsGenerating(true);
    // Mock AI generation
    setTimeout(() => {
      setValue("description", "This RFP is for the procurement of network infrastructure equipment to upgrade existing school facilities...");
      setValue("evaluationCriteria", "1. Technical compliance (40%)\n2. Cost effectiveness (30%)\n3. Implementation timeline (20%)\n4. Vendor experience (10%)");
      setIsGenerating(false);
      toast({
        title: "Draft Generated",
        description: "AI has generated a draft RFP for you to review.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Create a New RFP
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                RFP Title
              </label>
              <Input id="title" {...register("title")} required />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <Textarea id="description" {...register("description")} required />
            </div>

            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                Budget
              </label>
              <Input id="budget" type="number" {...register("budget")} required />
            </div>

            <div>
              <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                Submission Deadline
              </label>
              <Input id="deadline" type="datetime-local" {...register("deadline")} required />
            </div>

            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <Input id="startDate" type="datetime-local" {...register("startDate")} required />
            </div>

            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <Input id="endDate" type="datetime-local" {...register("endDate")} required />
            </div>

            <div>
              <label htmlFor="evaluationCriteria" className="block text-sm font-medium text-gray-700">
                Evaluation Criteria
              </label>
              <Textarea id="evaluationCriteria" {...register("evaluationCriteria")} />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create RFP"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRFP;