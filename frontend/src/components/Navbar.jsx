import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Bell } from "lucide-react"; // Bell icon
import { fetchNotifications } from "../api/notifications"; // API

const Navbar = () => {
  const navigate = useNavigate();
  const [userInitials, setUserInitials] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Notifications state
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [lastSeenCount, setLastSeenCount] = useState(0); // 👈 track last seen

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

    const token = localStorage.getItem("token");
    if (token) {
      // Initial fetch
      fetchNotifications(token).then((data) => {
        const notifs = data.notifications || [];
        setNotifications(notifs);
        setUnreadCount(Math.max(0, notifs.length - lastSeenCount));
      });

      // Poll every 10s
      const interval = setInterval(() => {
        fetchNotifications(token).then((data) => {
          const notifs = data.notifications || [];
          setNotifications(notifs);

          // New notifications only if length increased
          if (notifs.length > lastSeenCount) {
            setUnreadCount(notifs.length - lastSeenCount);
          }
        });
      }, 10000);

      return () => clearInterval(interval);
    }

    const handleStorageChange = () => loadUser();
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [lastSeenCount]);

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
            <div className="flex items-center space-x-3 relative">
              <button
                className="relative"
                onClick={() => {
                  const willOpen = !showDropdown;
                  setShowDropdown(willOpen);

                  if (willOpen) {
                    // Mark all as read
                    setLastSeenCount(notifications.length);
                    setUnreadCount(0);
                  }
                }}
              >
                <Bell className="w-6 h-6 text-purple-200 hover:text-white transition" />
                {unreadCount > 0 && !showDropdown && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showDropdown && (
                <div className="absolute right-0 top-10 w-72 bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white rounded-lg shadow-lg p-3 border border-purple-800/40">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-semibold text-purple-300">
                      Notifications
                    </h3>
                    <button
                      onClick={() => setShowDropdown(false)}
                      className="text-xs text-gray-400 hover:text-purple-400"
                    >
                      ✕
                    </button>
                  </div>
                  {notifications.length === 0 ? (
                    <p className="text-sm text-gray-500">No notifications</p>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n._id}
                        className="border-b border-gray-800 py-2 text-sm last:border-0"
                      >
                        <p className="font-medium text-purple-200">
                          {n.message}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(n.date).toLocaleString()}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              )}

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
