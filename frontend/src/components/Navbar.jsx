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
    <nav className="fixed w-full top-0 z-50 bg-black/90 backdrop-blur-md border-b border-purple-700/50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center space-x-2 group transition-transform duration-300"
        >
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-purple-500/50 transition">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <span className="text-2xl font-bold text-purple-400 group-hover:text-purple-300 transition">
            PayFlow
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                {userInitials}
              </div>

              <Link to="/updateinfo">
                <Button
                  variant="ghost"
                  className="text-purple-200 hover:bg-purple-700/30"
                >
                  Update Info
                </Button>
              </Link>

              <Button
                variant="ghost"
                className="text-purple-200 hover:bg-purple-700/30"
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
                  className="text-purple-200 hover:bg-purple-700/30"
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
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
