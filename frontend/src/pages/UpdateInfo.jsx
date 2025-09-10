import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, User, Lock } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { BACKEND_URL_DEV, BACKEND_URL_PROD } from "../lib/utils";

const UpdateInfo = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      // Only send non-empty fields
      const updateData = {};
      if (formData.firstName.trim()) updateData.firstName = formData.firstName;
      if (formData.lastName.trim()) updateData.lastName = formData.lastName;
      if (formData.password.trim()) updateData.password = formData.password;

      if (Object.keys(updateData).length === 0) {
        toast.error("Please enter at least one field to update.");
        return;
      }

      const response = await axios.put(
        `${BACKEND_URL_DEV}/user/updateinfo`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (updateData.firstName) {
        localStorage.setItem("firstName", updateData.firstName);
        window.dispatchEvent(new Event("storage"));
      }

      toast.success(response.data.message || "Update successful!", {
        description: "Your profile has been updated successfully.",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      toast.error("Error while updating info.", {
        description: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="inline-flex items-center text-purple-500 hover:text-purple-400 mb-8 transition-colors duration-300 opacity-0 animate-fade-in-up animate-delay-200"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <Card className="bg-gray-900 border border-gray-700 shadow-xl opacity-0 animate-scale-in">
          <CardHeader className="text-center space-y-2">
            <div className="flex justify-center mb-4 opacity-0 animate-fade-in-up animate-delay-300">
              <img
                src="/payflow.png"
                alt="PayFlow Logo"
                className="w-16 h-16 object-contain"
              />
            </div>

            <CardTitle className="text-2xl font-bold text-white opacity-0 animate-fade-in-up animate-delay-400">
              Update Information
            </CardTitle>

            <CardDescription className="text-gray-400 opacity-0 animate-fade-in-up animate-delay-500">
              Keep your profile details up to date
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="space-y-2 opacity-0 animate-fade-in-up animate-delay-600">
                <Label htmlFor="firstName" className="text-white">
                  First Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="John"
                    className="pl-10 bg-gray-800 text-white border border-gray-700 focus:border-purple-500"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2 opacity-0 animate-fade-in-up animate-delay-700">
                <Label htmlFor="lastName" className="text-white">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Doe"
                  className="bg-gray-800 text-white border border-gray-700 focus:border-purple-500"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2 opacity-0 animate-fade-in-up animate-delay-800">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 bg-gray-800 text-white border border-gray-700 focus:border-purple-500"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white opacity-0 animate-fade-in-up animate-delay-1000"
              >
                Update Info
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UpdateInfo;
