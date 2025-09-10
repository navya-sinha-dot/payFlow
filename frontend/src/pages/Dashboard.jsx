import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Send, Wallet } from "lucide-react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { BACKEND_URL_DEV, BACKEND_URL_PROD } from "../lib/utils";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBalance = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signin");
        return;
      }

      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setCurrentUserId(payload.userId);

        const response = await axios.get(`${BACKEND_URL_DEV}/account/balance`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBalance(response.data.balance);
      } catch (err) {
        console.error("Error fetching balance:", err);
        localStorage.removeItem("token");
        navigate("/signin");
      }
    };

    fetchBalance();
  }, [navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get(
          `${BACKEND_URL_DEV}/user/bulk?filter=${searchQuery}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const filteredUsers = response.data.user.filter(
          (user) => user._id !== currentUserId
        );
        setUsers(filteredUsers);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    if (currentUserId) fetchUsers();
  }, [searchQuery, currentUserId]);

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
          Loading your dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white">
      <Navbar />
      <div className="container mx-auto px-6 pt-28 pb-8">
        <Card className="mb-8 relative overflow-hidden rounded-2xl shadow-2xl border border-purple-500/40 animate-fade-in mx-8">
          <div className="absolute inset-0 bg-gradient-to-l from-purple-700 via-purple-800 to-purple-900" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-purple-500/30 rounded-full blur-3xl" />

          <CardContent className="relative p-6 z-10">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm shadow-lg">
                <Wallet className="h-6 w-6 text-white" />
              </div>
              <span className="text-lg font-semibold text-white drop-shadow-md">
                Your Balance
              </span>
            </div>

            <div className="text-5xl font-extrabold text-white tracking-tight drop-shadow-sm">
              {balance !== null
                ? `Rs ${Math.round(balance).toFixed(2)}`
                : "Loading..."}
            </div>

            <p className="mt-2 text-sm text-purple-200">
              Available across all linked accounts
            </p>
          </CardContent>
        </Card>

        <div className="opacity-0 animate-fade-in-up animate-delay-300">
          <h2 className="text-2xl font-bold mb-6 text-white">Users</h2>

          <div className="relative mb-6 opacity-0 animate-fade-in-up animate-delay-400">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search users..."
              className="pl-10 bg-gray-800 text-white border border-gray-700 focus:border-purple-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            {users.map((user, index) => (
              <Card
                key={user._id}
                className="bg-gray-900 border border-gray-700 hover:border-gray-300 transition duration-300 opacity-0 animate-scale-in"
                style={{ animationDelay: `${index * 0.1 + 0.5}s` }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-purple-600 text-white font-semibold">
                          {user.firstName[0]}
                          {user.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <span className="text-sm text-gray-400">
                          {user._id}
                        </span>
                        <div className="font-medium text-white">
                          {user.firstName} {user.lastName}
                        </div>
                      </div>
                    </div>

                    <Link
                      to={`/send?filter=${user._id}&name=${user.firstName}`}
                    >
                      <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                        <Send className="h-4 w-4 mr-2" />
                        Send Money
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {users.length === 0 && (
            <div className="text-center py-12 opacity-0 animate-fade-in-up animate-delay-700">
              <p className="text-gray-400">
                No users found matching your search.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
