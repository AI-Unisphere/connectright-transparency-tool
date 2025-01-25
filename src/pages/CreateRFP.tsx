import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Wand2 } from "lucide-react";

interface RFPFormData {
  title: string;
  description: string;
  budget: string;
  deadline: string;
  evaluationCriteria: string;
}

const CreateRFP = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const { register, handleSubmit, setValue } = useForm<RFPFormData>();

  const onSubmit = (data: RFPFormData) => {
    // Mock API call
    console.log("Submitting RFP:", data);
    toast({
      title: "RFP Created",
      description: "Your RFP has been successfully published.",
    });
    navigate("/dashboard");
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
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New RFP</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input {...register("title")} placeholder="Enter RFP title" required />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <div className="flex gap-2">
                <Textarea
                  {...register("description")}
                  placeholder="Enter RFP description"
                  className="min-h-[100px]"
                  required
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={generateDraft}
                  disabled={isGenerating}
                >
                  <Wand2 className="h-4 w-4 mr-2" />
                  {isGenerating ? "Generating..." : "Generate Draft"}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Budget (USD)</label>
                <Input
                  {...register("budget")}
                  type="number"
                  placeholder="Enter budget"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Deadline</label>
                <Input
                  {...register("deadline")}
                  type="date"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Evaluation Criteria</label>
              <Textarea
                {...register("evaluationCriteria")}
                placeholder="Enter evaluation criteria"
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </Button>
              <Button type="submit">Publish RFP</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateRFP;