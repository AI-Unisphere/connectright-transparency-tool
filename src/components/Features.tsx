import { Brain, Shield, Zap, BarChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "AI-Powered Evaluation",
    description: "Automated vendor evaluation and bid comparison using advanced AI algorithms",
    icon: Brain,
  },
  {
    title: "Blockchain Security",
    description: "Immutable audit trail of all procurement activities using blockchain technology",
    icon: Shield,
  },
  {
    title: "Real-time Analytics",
    description: "Predictive insights and risk assessment for optimal decision making",
    icon: BarChart,
  },
  {
    title: "Efficient Processing",
    description: "Streamlined workflows that reduce procurement time and costs",
    icon: Zap,
  },
];

export const Features = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="hover:shadow-lg transition-shadow animate-float">
              <CardHeader>
                <feature.icon className="h-12 w-12 text-secondary mb-4" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};