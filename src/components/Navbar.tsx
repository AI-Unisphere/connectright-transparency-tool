import { Link } from "react-router-dom";
import { Home, Info, Phone, User } from "lucide-react"; // Import icons from lucide-react

const Navbar = () => {
  return (
    <nav className="bg-primary text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center">
          {/* Logo (can be an icon or text) */}
          <div className="text-2xl font-bold">
            <Link to="/">Logo</Link>
          </div>
        </div>
        <div className="flex space-x-4">
          <Link to="/" className="flex items-center">
            <Home className="h-5 w-5 mr-1" /> Home
          </Link>
          <Link to="/about" className="flex items-center">
            <Info className="h-5 w-5 mr-1" /> About Us
          </Link>
          <Link to="/contact" className="flex items-center">
            <Phone className="h-5 w-5 mr-1" /> Contact
          </Link>
          <Link to="/login" className="flex items-center">
            <User className="h-5 w-5 mr-1" /> Login/Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 