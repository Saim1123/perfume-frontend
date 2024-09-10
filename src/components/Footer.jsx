import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 p-4 text-center">
      <ul className="flex justify-center items-center space-x-6">
        <li>
          <Link to="/" className="hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:underline">
            About Us
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
