import webLogo from "../../assets/pothik.png";
import founder from "../../assets/fuad.jpg";
import { Link } from "react-router";
const DashboardFooter = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 md:px-6 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left: Images */}
        <div className="flex items-center gap-4 justify-center md:justify-start">
          <img
            src={webLogo}
            alt="Website Logo"
            className="h-12 object-contain"
          />
          <img
            src={founder}
            alt="Payment Methods"
            className="h-12 rounded-full object-contain"
          />
        </div>
        

        {/* Middle: Documents */}
        <div className="flex flex-col items-center gap-2 text-sm">
          <Link to="/dashboard" className="hover:text-green-400 transition">
            Terms & Conditions
          </Link>
          <Link to="/dashboard" className="hover:text-green-400 transition">
            Privacy Policy
          </Link>
          <Link to="/dashboard" className="hover:text-green-400 transition">
            Help & Support
          </Link>
        </div>
      </div>
      <div className="text-center text-gray-400 mt-4">
        © {new Date().getFullYear()} Pothik. All rights reserved.Md Fuad Amir
      </div>
    </footer>
  );
};

export default DashboardFooter;
