import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import frFlag from "../assets/fr.png";
import enFlag from "../assets/en.png";

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();

  const languages = [
    { code: "FR", icon: frFlag },
    { code: "EN", icon: enFlag },
  ];

  const currentLang = i18n.language.toUpperCase();
  const selected = languages.find((lang) => lang.code === currentLang);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3  font-medium text-gray-700 dark:text-gray-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-200"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <img src={selected.icon} alt={selected.code} className="w-5 h-5 rounded-full" />
        {selected.code}
        <FaChevronDown
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-28 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-50"
          >
            {languages.map((lang) => (
              <li key={lang.code}>
                <button
                  onClick={() => {
                    i18n.changeLanguage(lang.code.toLowerCase());
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-orange-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                >
                  <img src={lang.icon} alt={lang.code} className="w-5 h-5 rounded-full" />
                  {lang.code}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;