import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [userInitials, setUserInitials] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loadUser = () => {
    const email = localStorage.getItem("userEmail");
    const firstName = localStorage.getItem("firstName");
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
      if (firstName && firstName.length > 0) {
        setUserInitials(firstName.charAt(0).toUpperCase());
      } else if (email) {
        setUserInitials(email.charAt(0).toUpperCase());
      }
    } else {
      setIsLoggedIn(false);
      setUserInitials("");
    }
  };

  useEffect(() => {
    loadUser();
    const handleStorageChange = () => loadUser();
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("firstName");
    setUserInitials("");
    setIsLoggedIn(false);

    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="fixed w-full top-0 z-50 bg-gradient-to-t from-gray-900 via-gray-950 to-black shadow-lg shadow-purple-900/20">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center space-x-2 group transition-transform duration-300 opacity-0 animate-fade-in-up animate-delay-200"
        >
          <img
            src="/payflow.png"
            alt="PayFlow Logo"
            className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-110"
          />
          <span className="text-2xl font-extrabold text-purple-400 group-hover:text-purple-300 transition">
            PayFlow
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 flex items-center justify-center text-white font-bold shadow-md shadow-purple-900/40 opacity-0 animate-fade-in-up animate-delay-400">
                {userInitials}
              </div>

              <Link to="/transactions">
                <Button
                  variant="ghost"
                  className="text-purple-200 hover:bg-purple-700/30 hover:text-white transition opacity-0 animate-fade-in-up animate-delay-450"
                >
                  View Transactions
                </Button>
              </Link>

              <Link to="/updateinfo">
                <Button
                  variant="ghost"
                  className="text-purple-200 hover:bg-purple-700/30 hover:text-white transition opacity-0 animate-fade-in-up animate-delay-500"
                >
                  Update Info
                </Button>
              </Link>

              <Button
                variant="ghost"
                className="text-purple-200 hover:bg-purple-700/30 hover:text-white transition opacity-0 animate-fade-in-up animate-delay-600"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Link to="/signin">
                <Button
                  variant="ghost"
                  className="text-purple-200 hover:bg-purple-700/30 hover:text-white transition opacity-0 animate-fade-in-up animate-delay-400"
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-800/40 opacity-0 animate-fade-in-up animate-delay-500">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
