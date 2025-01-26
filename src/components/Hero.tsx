import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div id="home" className="relative overflow-hidden bg-gradient-to-b from-primary to-primary/90 text-white py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6">
            AI-Powered Transparent Procurement System
          </h1>
          <p className="text-xl sm:text-2xl mb-8 text-gray-200">
            Revolutionizing public sector procurement with transparency, efficiency, and fairness.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/login">
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20">
                Login as Vendor
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20">
                Login as Procurement Officer
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
    </div>
  );
};