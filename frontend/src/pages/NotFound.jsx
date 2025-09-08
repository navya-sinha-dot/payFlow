import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white px-4">
      <div className="text-center animate-fade-in-up">
        {/* Error Code */}
        <h1 className="mb-4 text-6xl font-extrabold text-purple-500 drop-shadow-lg">
          404
        </h1>

        {/* Message */}
        <p className="mb-6 text-xl text-gray-300">
          Oops! The page{" "}
          <span className="text-purple-400 font-semibold">
            {location.pathname}
          </span>{" "}
          does not exist.
        </p>

        {/* Return Button */}
        <Link to="/">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
