import { DashboardNavbar } from "./DashboardNavbar";
import { Sidebar } from "./Sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user } = useAuth();
  const isGPO = user?.role === "GPO";

  return (
    <>
      <DashboardNavbar />
      <div className="flex h-screen overflow-hidden pt-16">
        <Sidebar />
        <div className={cn("flex-1 overflow-auto", isGPO && "pl-64")}>
          <main className="container mx-auto py-6 px-4">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}; 