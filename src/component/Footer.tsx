import { FaUser, FaRegFileAlt, FaPhoneAlt } from "react-icons/fa"; // Icons from react-icons

function Footer() {
  return (
    <footer className="text-black py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* First part: © 2025 JobFinder */}
        <div className="text-sm text-center md:text-left">
          © 2025 JobFinder. All rights reserved.
        </div>

        {/* Second part: Terms, Privacy, Contact with icons */}
        <div className="mt-4 md:mt-0 flex gap-6 text-sm">
          <a
            href="/terms"
            className="flex items-center gap-2 hover:text-primary transition-colors duration-300"
          >
            <FaRegFileAlt size={18} /> <span>Terms</span>
          </a>
          <a
            href="/privacy"
            className="flex items-center gap-2 hover:text-primary transition-colors duration-300"
          >
            <FaUser size={18} /> <span>Profile</span>
          </a>
          <a
            href="/contact"
            className="flex items-center gap-2 hover:text-primary transition-colors duration-300"
          >
            <FaPhoneAlt size={18} /> <span>Contact</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
