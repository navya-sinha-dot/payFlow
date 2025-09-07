import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="fixed w-full top-0 z-50 bg-black/90 backdrop-blur-md border-b border-purple-700/50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo + Title */}
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

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
