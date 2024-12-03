import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black/80 text-white flex items-center justify-center space-x-40 p-8 text-center text-xs">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-lg uppercase mb-3">Contact</h2>
        <div className="flex flex-col gap-1">
          <p>saimtahir3211@gmail.com</p>
          <p>03113050046</p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-lg uppercase mb-3">Pages</h2>
        <ul className="flex flex-col gap-1">
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
      </div>
    </footer>
  );
};

export default Footer;
