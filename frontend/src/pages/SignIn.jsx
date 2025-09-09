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
import { ArrowLeft, Mail, Lock } from "lucide-react";
import axios from "axios";
import { BACKEND_URL_PROD } from "../lib/utils";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${BACKEND_URL_PROD}/user/signin`, {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userEmail", formData.email);
        navigate("/dashboard");
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="inline-flex items-center text-purple-500 hover:text-purple-400 mb-4 transition-colors duration-300 opacity-0 animate-fade-in-up animate-delay-200"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <Card className="bg-gray-900 border border-gray-700 shadow-xl opacity-0 animate-scale-in">
          <CardHeader className="text-center space-y-2">
            {/* Logo instead of Circle */}
            <div className="flex justify-center mb-4 opacity-0 animate-fade-in-up animate-delay-300">
              <img
                src="/payflow.png" // make sure this path is correct (public/payflow.png)
                alt="PayFlow Logo"
                className="w-16 h-16 object-contain"
              />
            </div>

            <CardTitle className="text-2xl font-bold text-white opacity-0 animate-fade-in-up animate-delay-400">
              Welcome Back
            </CardTitle>

            <CardDescription className="text-gray-400 opacity-0 animate-fade-in-up animate-delay-500">
              Sign in to your PayFlow account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2 opacity-0 animate-fade-in-up animate-delay-600">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10 bg-gray-800 text-white placeholder-gray border border-gray-700 focus:border-purple-200"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 opacity-0 animate-fade-in-up animate-delay-700">
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
                    className="pl-10 bg-gray-800 text-white placeholder-gray border border-gray-700 focus:border-purple-500"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-sm opacity-0 animate-fade-in-up animate-delay-800">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white opacity-0 animate-fade-in-up animate-delay-900"
              >
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center animate-fade-in-up animate-delay-1000">
              <p className="text-purple-400">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-purple-500 hover:underline font-medium"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;
