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
import { ArrowLeft, User, DollarSign } from "lucide-react";

const SendMoney = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    recipient: "",
    amount: "",
    note: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard"); // redirect after sending money
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Link */}
        <Link
          to="/dashboard"
          className="inline-flex items-center text-purple-500 hover:text-purple-400 mb-8 transition-colors duration-300 opacity-0 animate-fade-in-up animate-delay-200"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>

        {/* Card */}
        <Card className="bg-gray-900 border border-gray-700 shadow-xl opacity-0 animate-scale-in">
          <CardHeader className="text-center space-y-2">
            {/* Icon */}
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 opacity-0 animate-fade-in-up animate-delay-300">
              <DollarSign className="h-6 w-6 text-white" />
            </div>

            {/* Title */}
            <CardTitle className="text-2xl font-bold text-white opacity-0 animate-fade-in-up animate-delay-400">
              Send Money
            </CardTitle>

            {/* Description */}
            <CardDescription className="text-white opacity-0 animate-fade-in-up animate-delay-500">
              Transfer funds instantly and securely
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Recipient */}
              <div className="space-y-2 opacity-0 animate-fade-in-up animate-delay-600">
                <Label htmlFor="recipient" className="text-white">
                  Recipient Username / Email
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="recipient"
                    name="recipient"
                    type="text"
                    placeholder="Enter recipient"
                    className="pl-10 bg-gray-800 text-white border border-gray-700 focus:border-purple-500"
                    value={formData.recipient}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Amount */}
              <div className="space-y-2 opacity-0 animate-fade-in-up animate-delay-700">
                <Label htmlFor="amount" className="text-white">
                  Amount
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    placeholder="Enter amount"
                    className="pl-10 bg-gray-800 text-white border border-gray-700 focus:border-purple-500"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Send Button */}
              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white opacity-0 animate-fade-in-up animate-delay-900"
              >
                Send Money
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SendMoney;
