import React from "react";

export default function Hero() {
  const handleDownloadCV = (e) => {
    e.preventDefault();
    const choice = window.prompt("Download CV in:\n1. French\n2. English\n\nType 1 or 2");
    if (choice === "1") {
      window.location.href = "/CV-fr.pdf";
    } else if (choice === "2") {
      window.location.href = "/CV-en.pdf";
    }
    // else do nothing
  };

  const [showDropdown, setShowDropdown] = React.useState(false);

  const handleDropdown = () => setShowDropdown((prev) => !prev);

  const handleDownload = (lang) => {
    if (lang === "fr") {
      window.location.href = "/CV-fr.pdf";
    } else if (lang === "en") {
      window.location.href = "/CV-en.pdf";
    }
    setShowDropdown(false);
  };

  return (
    <section
      id="home"
      className="h-screen flex flex-col justify-center items-center text-center px-6 "
    >
      <h2 className="text-4xl md:text-6xl font-bold text-gray-800">
        Hi, I’m <span className="text-orange-500">Chaymae</span>
      </h2>
      <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl">
        A passionate <span className="font-semibold">Full Stack Developer</span>  
        who loves building elegant and efficient digital experiences.
      </p>

      <div className="mt-8 flex space-x-4">
        <a
          href="#projects"
          className="px-6 py-3 bg-orange-500 text-white rounded-xl shadow-md hover:bg-orange-600 transition"
        >
          View My Work
        </a>
        <div className="relative">
          <button
            onClick={handleDropdown}
            className="px-6 py-3 border-2 border-orange-500 text-orange-500 rounded-xl hover:bg-orange-50 transition focus:outline-none"
            type="button"
          >
            Download CV
            <svg className="inline ml-2 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showDropdown && (
            <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
              <button
                onClick={() => handleDownload("fr")}
                className="block w-full text-left px-4 py-2 hover:bg-orange-50 rounded-t-xl"
              >
                Download CV (FR)
              </button>
              <button
                onClick={() => handleDownload("en")}
                className="block w-full text-left px-4 py-2 hover:bg-orange-50 rounded-b-xl"
              >
                Download CV (EN)
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
