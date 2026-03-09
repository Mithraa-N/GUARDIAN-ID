import { Link } from "react-router-dom";
import { Landmark } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="hero-gradient border-b border-primary-foreground/10">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Landmark className="w-6 h-6 text-gold" />
          <span className="text-primary-foreground font-heading text-lg font-semibold">GuardianID</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/login" className="text-primary-foreground/70 hover:text-primary-foreground text-sm font-body transition-colors">
            Sign In
          </Link>
          <Link
            to="/login"
            className="gold-gradient text-primary text-sm font-semibold px-5 py-2 rounded-md hover:opacity-90 transition-opacity"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
