import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 px-6 mt-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
       
        <div className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
          Chaymae Azzi
        </div>

        
        <div className="flex gap-6 mb-4 md:mb-0">
          <a
            href="https://github.com/azzichaymae"
            target="_blank"
            rel="noreferrer" 
            className="text-gray-600 hover:text-orange-500 transition"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/azzichaymae"
            target="_blank"
            rel="noreferrer" 
            className="text-gray-600 hover:text-orange-500 transition"
          >
            <FaLinkedin size={24} />
          </a>
          
        </div>

      
        <div className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Chaymae Azzi. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
