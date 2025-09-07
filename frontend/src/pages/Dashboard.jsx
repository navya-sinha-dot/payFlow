import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Send, LogOut, Wallet } from "lucide-react";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const users = [
    { id: "U1", name: "User 1", initials: "U1" },
    { id: "U2", name: "User 2", initials: "U2" },
    { id: "U3", name: "User 3", initials: "U3" },
    { id: "U4", name: "Alice Johnson", initials: "AJ" },
    { id: "U5", name: "Bob Smith", initials: "BS" },
    { id: "U6", name: "Charlie Brown", initials: "CB" },
  ];

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white">
      <div>
        <Navbar />
      </div>
      <div className="container mx-auto px-6 pt-28 pb-8">
        {/* Balance Card */}
        <Card className="mb-8 relative overflow-hidden rounded-2xl shadow-2xl border border-purple-500/40 animate-fade-in mx-8">
          {/* Gradient background with glow */}
          <div className="absolute inset-0 bg-gradient-to-l from-purple-700 via-purple-800 to-purple-900" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-purple-500/30 rounded-full blur-3xl" />

          <CardContent className="relative p-6 z-10">
            {/* Header */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm shadow-lg">
                <Wallet className="h-6 w-6 text-white" />
              </div>
              <span className="text-lg font-semibold text-white drop-shadow-md">
                Your Balance
              </span>
            </div>

            {/* Balance */}
            <div className="text-5xl font-extrabold text-white tracking-tight drop-shadow-sm">
              $5,000
            </div>

            {/* Subtext */}
            <p className="mt-2 text-sm text-purple-200">
              Available across all linked accounts
            </p>
          </CardContent>
        </Card>

        {/* Users Section */}
        <div className="opacity-0 animate-fade-in-up animate-delay-300">
          <h2 className="text-2xl font-bold mb-6 text-white">Users</h2>

          {/* Search Bar */}
          <div className="relative mb-6 opacity-0 animate-fade-in-up animate-delay-400">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search users..."
              className="pl-10 bg-gray-800 text-white border border-gray-700 focus:border-purple-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Users List */}
          <div className="space-y-3">
            {filteredUsers.map((user, index) => (
              <Card
                key={user.id}
                className="bg-gray-900 border border-gray-700 hover:border-gray-300 transition duration-300 opacity-0 animate-scale-in"
                style={{ animationDelay: `${index * 0.1 + 0.5}s` }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-purple-600 text-white font-semibold">
                          {user.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <span className="text-sm text-gray-400">{user.id}</span>
                        <div className="font-medium text-white">
                          {user.name}
                        </div>
                      </div>
                    </div>

                    <Link to={`/send?user=${user.id}&name=${user.name}`}>
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

          {filteredUsers.length === 0 && (
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
