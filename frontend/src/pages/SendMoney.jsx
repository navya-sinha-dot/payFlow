import { useState, useEffect } from "react";
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
import { ArrowLeft, DollarSign, CheckCircle, XCircle } from "lucide-react";

const SendMoney = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const recipientId = searchParams.get("filter");
  const recipientName = searchParams.get("name");
  const [formData, setFormData] = useState({ amount: "" });
  const [loading, setLoading] = useState(false);

  // notification state
  const [notification, setNotification] = useState(null);

  // auto-hide notification after 3s
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:3000/api/v1/account/transfer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            to: recipientId,
            amount: Number(formData.amount),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setNotification({
          type: "error",
          message: data.message || "Transfer failed",
        });
      } else {
        setNotification({
          type: "success",
          message: `₹${formData.amount} sent to ${recipientName || "user"}!`,
        });
        setTimeout(() => navigate("/dashboard"), 1500);
      }
    } catch (error) {
      console.error(error);
      setNotification({ type: "error", message: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link
          to="/dashboard"
          className="inline-flex items-center text-purple-500 hover:text-purple-400 mb-8 transition-colors duration-300 opacity-0 animate-fade-in-up animate-delay-200"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Link>

        <Card className="bg-gray-800/60 border border-gray-700 text-white rounded-2xl shadow-2xl overflow-hidden backdrop-blur-lg opacity-0 animate-fade-in-up animate-delay-400">
          <CardHeader>
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
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
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

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 transition-colors"
              >
                {loading ? "Transferring..." : "Send Money"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 animate-slide-up">
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border 
            ${
              notification.type === "success"
                ? "bg-green-600/90 border-green-400"
                : "bg-red-600/90 border-red-400"
            }`}
          >
            {notification.type === "success" ? (
              <CheckCircle className="w-5 h-5 text-white" />
            ) : (
              <XCircle className="w-5 h-5 text-white" />
            )}
            <span className="text-white font-medium">
              {notification.message}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendMoney;
