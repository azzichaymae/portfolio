import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import LanguageSwitcher from "./LanguageSwitcher";
import { useI18n } from "../hooks/useI18n";


export default function Navbar() {
      const { t } = useI18n();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { label: "navbar.home", href: "#home" },
    { label: "navbar.about", href: "#about" },
    { label: "navbar.projects", href: "#projects" },
    { label: "navbar.contact", href: "#contact" },
  ];
const [lang, setLang] = useState("EN");

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-orange-500 dark:text-orange-400">
          Chaymae Azzi
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 font-medium text-gray-700 dark:text-gray-200">
          {navItems.map((item) => (
            <li key={t(item.label)}>
              <a
                href={item.href}
                className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-200"
              >
                {t(item.label)}
              </a>
            </li>
          ))}
          <LanguageSwitcher currentLang={lang} setLang={setLang} />

        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
          >
            <ul className="flex flex-col items-center py-4 space-y-4 font-medium text-gray-700 dark:text-gray-200">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-lg hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
