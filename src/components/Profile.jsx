"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const Profile = ({ user, setUser }) => {
  const router = useRouter();
  const dbUrl = process.env.NEXT_PUBLIC_DB_URL;

  const [activeTab, setActiveTab] = useState("dashboard");
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    email: "",
    bitcoin_address: "",
    country: "",
  });
  const [preview, setPreview] = useState("");

  // Initialize form data when user is loaded
  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id,
        username: user.username || "",
        phone: user.phone || "",
        email: user.email || "",
        bitcoin_address: user.bitcoin_address || "",
        country: user.country || "",
      });
      setPreview(
        user.profilePic ? `/uploads/${user.profilePic}` : "/images/default.jpeg"
      );
    }
  }, [user]);

  // Handle profile picture upload preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024 * 1024) {
        toast.error("File too large (max 2GB)");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Update profile form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${dbUrl}/update_profile.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setUser({ ...user, ...formData }); // update parent state
        toast.success("Profile updated successfully");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Profile update failed");
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch(`${dbUrl}/logout.php`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        localStorage.removeItem("user");
        sessionStorage.clear();
        toast.success("Logged out successfully");
        router.push("/login");
      }
    } catch (err) {
      console.error(err);
      toast.error("Logout failed");
    }
  };

  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "profile", label: "Profile Details" },
    { id: "logout", label: "Logout" },
  ];

  const buttonClass = (tabId) =>
    `text-lg py-2 rounded-sm font-semibold text-gray-700 hover:text-gray-900 ${
      activeTab === tabId ? "bg-gray-400 text-white" : ""
    }`;

  return (
    <div className="w-full bg-gray-50 shadow-lg p-6 flex flex-col items-center">
      {/* Tabs */}
      <nav className="flex space-x-4 mb-6 border-b pb-4 border-b-gray-400 w-full justify-center">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant="link"
            onClick={() =>
              tab.id === "logout" ? handleLogout() : setActiveTab(tab.id)
            }
            className={buttonClass(tab.id)}
          >
            {tab.label}
          </Button>
        ))}
      </nav>

      {/* Tab Content */}
      <div className="text-center w-full max-w-md">
        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <div className="flex flex-col items-center">
            <Image
              src={preview || "/images/default.jpeg"}
              alt="Profile Picture"
              width={120}
              height={120}
              className="rounded-full mb-4"
            />
            <h2 className="text-2xl font-semibold mb-2">
              Welcome, {user.username}
            </h2>
            <p className="text-gray-600 mb-4">
              From your account dashboard you can edit your profile details and
              edit your password.
            </p>
            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:underline"
            >
              Not {user.username}? Sign out
            </button>
          </div>
        )}

        {/* Profile Details */}
        {activeTab === "profile" && (
          <div className="space-y-4 text-left">
            <div className="text-center mb-4">
              <Image
                src={preview || "/images/default.jpeg"}
                alt="Profile Picture"
                width={120}
                height={120}
                className="rounded-full"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="username">Username *</Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <input type="hidden" name="id" value={user.id} />
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="email">User Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="bitcoin_address">Bitcoin Address</Label>
              <Input
                id="bitcoin_address"
                name="bitcoin_address"
                value={formData.bitcoin_address}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="country">Country *</Label>
              <Input
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>

            <Button className="w-full mt-4" onClick={handleSubmit}>
              Update Profile
            </Button>
          </div>
        )}

        {/* Logout */}
        {activeTab === "logout" && (
          <p className="text-red-500 font-semibold">Logging out...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
