import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import CreateRFP from "@/pages/CreateRFP";
import RFPList from "@/pages/RFPList";
import VendorDashboard from "@/pages/VendorDashboard";
import VendorRFPList from "@/pages/VendorRFPList";
import SubmitBid from "@/pages/SubmitBid";
import SubmittedBids from "@/pages/SubmittedBids";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/rfp/create" element={<CreateRFP />} />
          <Route path="/rfp" element={<RFPList />} />
          <Route path="/vendor/dashboard" element={<VendorDashboard />} />
          <Route path="/vendor/rfps" element={<VendorRFPList />} />
          <Route path="/vendor/bid/new" element={<SubmitBid />} />
          <Route path="/vendor/bids" element={<SubmittedBids />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;