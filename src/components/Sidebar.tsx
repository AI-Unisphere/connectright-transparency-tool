import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  FolderKanban,
  ChevronDown,
  Package,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href?: string;
  isActive?: boolean;
}

const SidebarItem = ({ icon: Icon, label, href, isActive }: SidebarItemProps) => {
  return (
    <Link
      to={href || "#"}
      className={cn(
        "flex items-center gap-x-2 text-white py-2 px-4 rounded-lg hover:bg-white/10 transition-colors",
        isActive && "bg-white/10"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  );
};

export const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [isRFPOpen, setIsRFPOpen] = useState(true);

  const isGPO = user?.role === "GPO";

  if (!isGPO) return null;

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-primary mt-16">
      <div className="flex flex-col gap-2 p-4">
        <SidebarItem
          icon={LayoutDashboard}
          label="Dashboard"
          href="/dashboard"
          isActive={location.pathname === "/dashboard"}
        />

        <Collapsible
          open={isRFPOpen}
          onOpenChange={setIsRFPOpen}
          className="space-y-2"
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-between text-white hover:bg-white/10",
                (location.pathname.startsWith("/rfp") ||
                  location.pathname === "/categories") &&
                  "bg-white/10"
              )}
            >
              <div className="flex items-center gap-x-2">
                <FileText className="h-5 w-5" />
                <span>RFP Management</span>
              </div>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  isRFPOpen && "rotate-180"
                )}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 pl-6">
            <SidebarItem
              icon={FolderKanban}
              label="Categories"
              href="/categories"
              isActive={location.pathname === "/categories"}
            />
            <SidebarItem
              icon={FileText}
              label="RFP List"
              href="/rfp"
              isActive={location.pathname === "/rfp"}
            />
          </CollapsibleContent>
        </Collapsible>

        <SidebarItem
          icon={Package}
          label="Bid Management"
          href="/bids"
          isActive={location.pathname === "/bids" || location.pathname.includes("/bid/")}
        />
      </div>
    </div>
  );
}; 