import { Link } from "react-router-dom";
import { Home, Info, Phone, User } from "lucide-react"; // Import icons from lucide-react

const Navbar = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="bg-primary text-white py-4 fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center">
          {/* Logo (can be an icon or text) */}
          <div className="text-2xl font-bold">
            <Link to="/">Logo</Link>
          </div>
        </div>
        <div className="flex space-x-4">
          <button onClick={() => scrollToSection('home')} className="flex items-center">
            <Home className="h-5 w-5 mr-1" /> Home
          </button>
          <button onClick={() => scrollToSection('about')} className="flex items-center">
            <Info className="h-5 w-5 mr-1" /> About Us
          </button>
          <button onClick={() => scrollToSection('contact')} className="flex items-center">
            <Phone className="h-5 w-5 mr-1" /> Contact
          </button>
          <Link to="/register" className="flex items-center">
            <User className="h-5 w-5 mr-1" /> Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 