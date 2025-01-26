import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3000/auth/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Use the stored token
          },
        });
        setProfile(response.data); // Assuming the response contains the profile data
      } catch (error) {
        toast({
          title: "Error fetching profile",
          description: "Unable to retrieve profile information.",
          variant: "destructive",
        });
        navigate("/login"); // Redirect to login if there's an error
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate, toast]);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or skeleton
  }

  if (!profile) {
    return <div>No profile data available.</div>; // Handle case where no profile data is found
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">User Profile</h1>
      <div className="mt-4">
        <p><strong>Company Name:</strong> {profile.companyName}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Phone:</strong> {profile.phone}</p>
        <p><strong>Address:</strong> {profile.address}</p>
        <p><strong>Experience:</strong> {profile.experience} years</p>
        <p><strong>Services:</strong> {profile.services}</p>
        <p><strong>Projects:</strong> {profile.projects}</p>
      </div>
    </div>
  );
};

export default Profile; 