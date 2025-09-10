import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ArrowLeft, Clock } from "lucide-react";
import { BACKEND_URL_DEV } from "../lib/utils";
import { toast } from "sonner";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${BACKEND_URL_PROD}/account/transactions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message || "Failed to fetch transactions");
        } else {
          setTransactions(data.transactions || []);
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong while fetching history");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

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
          Loading your Transactions ...
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Link
          to="/dashboard"
          className="inline-flex items-center text-purple-500 hover:text-purple-400 mb-8 transition-colors duration-300 opacity-0 animate-fade-in-up animate-delay-200"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Link>

        <Card className="bg-gray-800/60 border border-gray-700 text-white rounded-2xl shadow-2xl overflow-hidden backdrop-blur-lg opacity-0 animate-fade-in-up animate-delay-400">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <img
                src="/payflow.png"
                alt="PayFlow Logo"
                className="w-16 h-16 object-contain"
              />
            </div>
            <CardTitle className="text-2xl font-bold text-center text-purple-400">
              Transaction History
            </CardTitle>
            <CardDescription className="text-gray-400 text-center">
              View all your recent transactions
            </CardDescription>
          </CardHeader>

          <CardContent>
            {transactions.length === 0 ? (
              <p className="text-center text-gray-400">No transactions found</p>
            ) : (
              <ul className="divide-y divide-gray-700">
                {transactions.map((tx, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between py-4 opacity-0 animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div>
                      <p
                        className={`font-semibold ${
                          tx.relativeType === "credit"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {tx.relativeType === "credit" ? "Received" : "Sent"} ₹
                        {tx.amount}
                      </p>
                      <p className="text-sm text-gray-400">
                        {tx.relativeType === "credit"
                          ? `From: ${tx.from?.firstName || "User"}`
                          : `To: ${tx.to?.firstName || "User"}`}
                      </p>
                    </div>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {new Date(tx.date).toLocaleString()}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TransactionHistory;
