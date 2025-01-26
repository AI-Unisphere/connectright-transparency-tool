import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import CreateRFP from "@/pages/CreateRFP";
import RFPList from "@/pages/RFPList";
import RFPDetails from "@/pages/RFPDetails";
import VendorDashboard from "@/pages/VendorDashboard";
import VendorRFPList from "@/pages/VendorRFPList";
import SubmitBid from "@/pages/SubmitBid";
import SubmittedBids from "@/pages/SubmittedBids";
import Profile from "@/pages/Profile";
import VerificationRequest from "@/pages/VerificationRequest";
import VerifyBusiness from "@/pages/VerifyBusiness";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/verification/request" element={<VerificationRequest />} />
          <Route path="/vendor/verification/verify/:token" element={<VerifyBusiness />} />
          <Route path="/rfp/create" element={<CreateRFP />} />
          <Route path="/rfp" element={<RFPList />} />
          <Route path="/rfp/:id" element={<RFPDetails />} />
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