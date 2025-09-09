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

const UpdateInfo = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

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
        setMessage("Please enter at least one field to update.");
        setSuccess(false);
        return;
      }

      const response = await axios.put(
        "http://localhost:3000/api/v1/user/updateinfo",
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

      setMessage(response.data.message || "Update successful");
      setSuccess(true);
    } catch (err) {
      setMessage("Error while updating info");
      setSuccess(false);
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
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 opacity-0 animate-fade-in-up animate-delay-300">
              <span className="text-white font-bold text-xl">U</span>
            </div>

            <CardTitle className="text-2xl font-bold text-white opacity-0 animate-fade-in-up animate-delay-400">
              Update Information
            </CardTitle>

            <CardDescription className="text-white opacity-0 animate-fade-in-up animate-delay-500">
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

              {message && (
                <p className="text-purple-400 text-sm opacity-0 animate-fade-in-up animate-delay-900">
                  {message}
                </p>
              )}

              {!success && (
                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white opacity-0 animate-fade-in-up animate-delay-1000"
                >
                  Update Info
                </Button>
              )}

              {success && (
                <Button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  className="w-full bg-green-600 hover:bg-green-700 text-white opacity-0 animate-fade-in-up animate-delay-1000"
                >
                  Go to Dashboard
                </Button>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UpdateInfo;
