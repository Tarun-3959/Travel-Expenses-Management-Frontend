import { FaReact, FaNodeJs, FaGithub, FaLinkedin } from "react-icons/fa";
import { SiTailwindcss, SiMongodb, SiExpress } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Left - Project Name */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-semibold">Trip Tally</h2>
          <p className="text-sm text-gray-400">
            Track your trip expenses with ease.
          </p>
        </div>

        {/* Middle - Technologies Used */}
        <div className="flex justify-center space-x-6 text-3xl">
          <FaReact
            title="React"
            className="text-blue-400 hover:scale-110 transition"
          />
          <SiExpress
            title="Express.js"
            className="text-gray-300 hover:scale-110 transition"
          />
          <SiTailwindcss
            title="Tailwind CSS"
            className="text-teal-400 hover:scale-110 transition"
          />
          <SiMongodb
            title="MongoDB"
            className="text-green-500 hover:scale-110 transition"
          />
        </div>

        {/* Right - Social Links */}
        <div className="flex justify-center md:justify-end space-x-4 text-2xl">
          <a
            href="https://github.com/your-github"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/your-linkedin"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-4">
        &copy; {new Date().getFullYear()} Trip Tally. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
