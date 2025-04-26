import { FaUser, FaRegFileAlt } from "react-icons/fa";
import DarkLight from "./DarkLight";

function Footer() {
  return (
    <footer className="py-6 bg-white dark:bg-zinc-900 text-black dark:text-white">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* First part: © 2025 JobFinder */}
        <div className="text-sm text-center md:text-left">
          © 2025 JobFinder. All rights reserved.
        </div>

        {/* Second part: Links and Theme Toggle */}
        <div className="mt-4 md:mt-0 flex gap-6 text-sm items-center">
          <a
            href="/terms"
            className="flex items-center gap-2 hover:text-primary transition-colors duration-300 dark:hover:text-zinc-300"
          >
            <FaRegFileAlt size={18} /> <span>Terms</span>
          </a>
          <a
            href="/privacy"
            className="flex items-center gap-2 hover:text-primary transition-colors duration-300 dark:hover:text-zinc-300"
          >
            <FaUser size={18} /> <span>User Informations</span>
          </a>
          <DarkLight />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
