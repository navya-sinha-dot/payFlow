import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./pages/ProtectedRoutes";
import AOS from "aos";
import CustomCursor from "./components/CustomCursor";
import UpdateInfo from "./pages/UpdateInfo";
import TransactionHistory from "./pages/TransactionHistory";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true }); // initialize AOS
  }, []);

  return (
    <div className="cursor-none">
      <CustomCursor />

      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/transactions" element={<TransactionHistory />} />
              <Route path="/send" element={<SendMoney />} />
              <Route
                path="/updateinfo"
                element={
                  <ProtectedRoute>
                    <UpdateInfo />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </div>
  );
};

export default App;
