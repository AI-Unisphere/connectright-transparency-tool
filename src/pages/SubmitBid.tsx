import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  costEstimate: z.string().min(1, "Cost estimate is required"),
  deliveryTimeline: z.string().min(1, "Delivery timeline is required"),
  proposalDetails: z.string().min(10, "Proposal details must be at least 10 characters"),
});

const SubmitBid = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  console.log("Rendering SubmitBid");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      costEstimate: "",
      deliveryTimeline: "",
      proposalDetails: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Submitting bid:", values);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Bid Submitted",
        description: "Your bid has been successfully submitted for review.",
      });
      navigate("/vendor/bids");
    }, 1000);
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Submit Bid</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="costEstimate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cost Estimate</FormLabel>
                <FormControl>
                  <Input placeholder="Enter cost estimate" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="deliveryTimeline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Timeline</FormLabel>
                <FormControl>
                  <Input placeholder="Enter delivery timeline" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="proposalDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Proposal Details</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter detailed proposal"
                    className="min-h-[200px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Submit Bid
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SubmitBid;