import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
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
import { ArrowLeft, IndianRupee } from "lucide-react";
import { toast } from "sonner";
import { BACKEND_URL_DEV, BACKEND_URL_PROD } from "../lib/utils";

const SendMoney = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const recipientId = searchParams.get("filter");
  const recipientName = searchParams.get("name");
  const [formData, setFormData] = useState({ amount: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      // Step 1: Verify password
      const verifyRes = await fetch(`${BACKEND_URL_PROD}/user/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password: formData.password }),
      });

      if (!verifyRes.ok) {
        const err = await verifyRes.json();
        toast.error(err.message || "Password verification failed");
        setLoading(false);
        return;
      }

      // Step 2: Transfer money
      const response = await fetch(`${BACKEND_URL_PROD}/account/transfer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          to: recipientId,
          amount: Number(formData.amount),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Transfer failed", {
          description: "Please check the details and try again.",
        });
      } else {
        toast.success(
          `₹${formData.amount} sent to ${recipientName || "user"}!`,
          {
            description: "Your transfer was successful.",
          }
        );
        setTimeout(() => navigate("/dashboard"), 1500);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", {
        description: "Unable to complete the transfer.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white relative overflow-hidden">
        <div className="absolute flex space-x-6">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className="text-3xl text-purple-400 animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              ₹
            </span>
          ))}
        </div>

        <p className="mt-24 text-lg font-medium text-purple-300 animate-fade-in">
          Processing your transfer...
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link
          to="/dashboard"
          className="inline-flex items-center text-purple-500 hover:text-purple-400 mb-8 transition-colors duration-300 opacity-0 animate-fade-in-up animate-delay-200"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Link>

        <Card className="bg-gray-800/60 border border-gray-700 text-white rounded-2xl shadow-2xl overflow-hidden backdrop-blur-lg opacity-0 animate-fade-in-up animate-delay-400">
          <CardHeader>
            <div className="flex justify-center mb-4 opacity-0 animate-fade-in-up animate-delay-300">
              <img
                src="/payflow.png"
                alt="PayFlow Logo"
                className="w-16 h-16 object-contain"
              />
            </div>
            <CardTitle className="text-2xl font-bold text-center text-purple-400">
              Send Money
            </CardTitle>
            <CardDescription className="text-gray-400 text-center">
              Transfer funds securely
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="pl-10 bg-gray-700/50 border-gray-600 focus:border-purple-500 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password || ""}
                  onChange={handleChange}
                  className="bg-gray-700/50 border-gray-600 focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 transition-colors"
              >
                {loading ? "Processing..." : "Send Money"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default SendMoney;
