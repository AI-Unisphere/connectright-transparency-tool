import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { DashboardLayout } from "@/components/DashboardLayout";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import Categories from "@/pages/Categories";
import CreateRFP from "@/pages/CreateRFP";
import RFPList from "@/pages/RFPList";
import RFPDetails from "@/pages/RFPDetails";
import BidManagement from "@/pages/BidManagement";
import BidDetails from "@/pages/BidDetails";
import VendorDashboard from "@/pages/VendorDashboard";
import VendorRFPList from "@/pages/VendorRFPList";
import SubmitBid from "@/pages/SubmitBid";
import SubmittedBids from "@/pages/SubmittedBids";
import Profile from "@/pages/Profile";
import VerificationRequest from "@/pages/VerificationRequest";
import VerifyBusiness from "@/pages/VerifyBusiness";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-background">
          <Routes>
            {/* Public Routes */}
            <Route
              path="/"
              element={
                <PublicLayout>
                  <Index />
                </PublicLayout>
              }
            />
            <Route
              path="/login"
              element={
                <PublicLayout>
                  <Login />
                </PublicLayout>
              }
            />
            <Route
              path="/register"
              element={
                <PublicLayout>
                  <Register />
                </PublicLayout>
              }
            />

            {/* Protected GPO Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={["GPO"]}>
                  <DashboardLayout>
                    <Dashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/categories"
              element={
                <ProtectedRoute allowedRoles={["GPO"]}>
                  <DashboardLayout>
                    <Categories />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/rfp/create"
              element={
                <ProtectedRoute allowedRoles={["GPO"]}>
                  <DashboardLayout>
                    <CreateRFP />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/rfp"
              element={
                <ProtectedRoute allowedRoles={["GPO"]}>
                  <DashboardLayout>
                    <RFPList />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/rfp/:id"
              element={
                <ProtectedRoute allowedRoles={["GPO"]}>
                  <DashboardLayout>
                    <RFPDetails />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/bids"
              element={
                <ProtectedRoute allowedRoles={["GPO"]}>
                  <DashboardLayout>
                    <BidManagement />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/rfp/:rfpId/bid/:bidId"
              element={
                <ProtectedRoute allowedRoles={["GPO"]}>
                  <DashboardLayout>
                    <BidDetails />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* Protected Vendor Routes */}
            <Route
              path="/vendor/dashboard"
              element={
                <ProtectedRoute allowedRoles={["VENDOR"]}>
                  <DashboardLayout>
                    <VendorDashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/vendor/rfps"
              element={
                <ProtectedRoute allowedRoles={["VENDOR"]}>
                  <DashboardLayout>
                    <VendorRFPList />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/vendor/bid/new"
              element={
                <ProtectedRoute allowedRoles={["VENDOR"]}>
                  <DashboardLayout>
                    <SubmitBid />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/vendor/bids"
              element={
                <ProtectedRoute allowedRoles={["VENDOR"]}>
                  <DashboardLayout>
                    <SubmittedBids />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* Protected Common Routes */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Profile />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/verification/request"
              element={
                <ProtectedRoute allowedRoles={["VENDOR"]}>
                  <DashboardLayout>
                    <VerificationRequest />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/vendor/verification/verify/:token"
              element={
                <PublicLayout>
                  <VerifyBusiness />
                </PublicLayout>
              }
            />
          </Routes>
          <Toaster />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;