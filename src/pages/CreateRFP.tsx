import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Category {
  id: string;
  name: string;
}

const createRFPSchema = z.object({
  title: z.string().min(1, "Title is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  timeline: z.object({
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
  }),
  budget: z.number().min(0, "Budget must be a positive number"),
  submissionDeadline: z.string().min(1, "Submission deadline is required"),
  categoryId: z.string().min(1, "Category is required"),
  technicalRequirements: z.array(z.string()),
  managementRequirements: z.array(z.string()),
  pricingDetails: z.string().min(1, "Pricing details are required"),
  evaluationCriteria: z.object({
    metrics: z.array(
      z.object({
        name: z.string().min(1, "Metric name is required"),
        weightage: z.number().min(0).max(100, "Weightage must be between 0 and 100"),
      })
    ),
  }),
  specialInstructions: z.string().optional(),
});

type CreateRFPForm = z.infer<typeof createRFPSchema>;

export default function CreateRFP() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [generatedDescription, setGeneratedDescription] = useState<string>("");
  const [rfpId, setRfpId] = useState<string>("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<CreateRFPForm>({
    resolver: zodResolver(createRFPSchema),
    defaultValues: {
      title: "",
      shortDescription: "",
      timeline: {
        startDate: "",
        endDate: "",
      },
      budget: 0,
      submissionDeadline: "",
      categoryId: "",
      technicalRequirements: [""],
      managementRequirements: [""],
      pricingDetails: "",
      evaluationCriteria: {
        metrics: [{ name: "", weightage: 0 }],
      },
      specialInstructions: "",
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/rfp/categories");
        setCategories(response.data.data);
      } catch (error: any) {
        toast({
          title: "Error fetching categories",
          description: error.response?.data?.message || "Unable to fetch categories",
          variant: "destructive",
        });
      }
    };

    fetchCategories();
  }, []);

  const onSubmit = async (data: CreateRFPForm) => {
    setIsLoading(true);
    try {
      // Format dates to ISO 8601
      const formattedData = {
        ...data,
        timeline: {
          startDate: new Date(data.timeline.startDate).toISOString(),
          endDate: new Date(data.timeline.endDate).toISOString(),
        },
        submissionDeadline: new Date(data.submissionDeadline).toISOString(),
        // Filter out empty requirements
        technicalRequirements: data.technicalRequirements.filter(Boolean),
        managementRequirements: data.managementRequirements.filter(Boolean),
        // Filter out metrics with empty names
        evaluationCriteria: {
          metrics: data.evaluationCriteria.metrics.filter(m => m.name.trim()),
        },
        // Explicitly set issueDate to null for draft
        issueDate: null,
      };

      if (!isReviewMode) {
        // Create RFP in draft mode
        const response = await api.post("/rfp/create", formattedData);
        setRfpId(response.data.data.id);
        setGeneratedDescription(response.data.data.longDescription);
        setIsReviewMode(true);
        toast({
          title: "RFP Created",
          description: "Please review the AI-generated description before publishing.",
        });
      } else {
        // Publish the RFP
        await api.patch(`/rfp/${rfpId}/publish`);
        toast({
          title: "RFP Published",
          description: "Your RFP has been published successfully.",
        });
        navigate(`/rfp/${rfpId}`);
      }
    } catch (error: any) {
      toast({
        title: isReviewMode ? "Error publishing RFP" : "Error creating RFP",
        description: error.response?.data?.message || `Unable to ${isReviewMode ? 'publish' : 'create'} RFP`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addRequirement = (field: "technicalRequirements" | "managementRequirements") => {
    const currentValue = form.getValues(field);
    form.setValue(field, [...currentValue, ""]);
  };

  const removeRequirement = (field: "technicalRequirements" | "managementRequirements", index: number) => {
    const currentValue = form.getValues(field);
    form.setValue(
      field,
      currentValue.filter((_, i) => i !== index)
    );
  };

  const addMetric = () => {
    const currentMetrics = form.getValues("evaluationCriteria.metrics");
    form.setValue("evaluationCriteria.metrics", [
      ...currentMetrics,
      { name: "", weightage: 0 },
    ]);
  };

  const removeMetric = (index: number) => {
    const currentMetrics = form.getValues("evaluationCriteria.metrics");
    form.setValue(
      "evaluationCriteria.metrics",
      currentMetrics.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          {isReviewMode ? "Review RFP" : "Create New RFP"}
        </h2>
        <p className="text-muted-foreground">
          {isReviewMode 
            ? "Review the AI-generated description and other details before publishing"
            : "Fill in the details below to create a new Request for Proposal"}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {isReviewMode && (
            <Card>
              <CardHeader>
                <CardTitle>AI-Generated Description</CardTitle>
              </CardHeader>
              <CardContent>
                <Alert>
                  <AlertDescription className="whitespace-pre-wrap">
                    {generatedDescription}
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter RFP title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="shortDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter a brief description"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Budget</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter budget amount"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="submissionDeadline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Submission Deadline</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="timeline.startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timeline.endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <FormLabel>Technical Requirements</FormLabel>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addRequirement("technicalRequirements")}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Requirement
                  </Button>
                </div>
                {form.watch("technicalRequirements").map((_, index) => (
                  <div key={index} className="flex gap-2">
                    <FormField
                      control={form.control}
                      name={`technicalRequirements.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="Enter requirement" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeRequirement("technicalRequirements", index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <FormLabel>Management Requirements</FormLabel>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addRequirement("managementRequirements")}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Requirement
                  </Button>
                </div>
                {form.watch("managementRequirements").map((_, index) => (
                  <div key={index} className="flex gap-2">
                    <FormField
                      control={form.control}
                      name={`managementRequirements.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="Enter requirement" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeRequirement("managementRequirements", index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Evaluation Criteria</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <FormLabel>Metrics</FormLabel>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addMetric}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Metric
                  </Button>
                </div>
                {form.watch("evaluationCriteria.metrics").map((_, index) => (
                  <div key={index} className="flex gap-4">
                    <FormField
                      control={form.control}
                      name={`evaluationCriteria.metrics.${index}.name`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="Metric name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`evaluationCriteria.metrics.${index}.weightage`}
                      render={({ field }) => (
                        <FormItem className="w-32">
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Weightage"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeMetric(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Additional Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="pricingDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pricing Details</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter pricing details and requirements"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="specialInstructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Instructions (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter any special instructions or notes"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                if (isReviewMode) {
                  setIsReviewMode(false);
                } else {
                  navigate("/rfp");
                }
              }}
            >
              {isReviewMode ? "Back to Edit" : "Cancel"}
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading 
                ? (isReviewMode ? "Publishing..." : "Creating...") 
                : (isReviewMode ? "Publish RFP" : "Review RFP")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}