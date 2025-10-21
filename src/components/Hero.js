import React from "react";
import { useI18n } from "../hooks/useI18n";
import { Trans } from "react-i18next";


export default function Hero() {
  const { t,i18n } = useI18n();
 
  

  const [showDropdown, setShowDropdown] = React.useState(false);

  const handleDropdown = () => setShowDropdown((prev) => !prev);

  const handleDownload = () => {
    const lang = i18n.language;
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
        <Trans i18nKey="Hero.greeting">
          Hi, I’m <span className="text-orange-500">Chaymae</span>
        </Trans>
      </h2>
      <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl">
        <Trans i18nKey="Hero.about">
          A passionate <span className="font-semibold">Full Stack Developer</span>  
        who loves building elegant and efficient digital experiences.
        </Trans>
      </p>

      <div className="mt-8 flex space-x-4">
        <a
          href="#projects"
          className="px-6 py-3 bg-orange-500 text-white rounded-xl shadow-md hover:bg-orange-600 transition"
        >
          {t("Hero.work")}
        </a>
        <div className="relative">
          <button
            onClick={handleDropdown}
            className="px-6 py-3 border-2 border-orange-500 text-orange-500 rounded-xl hover:bg-orange-50 transition focus:outline-none"
            type="button"
          >
            {t("Hero.download")}
            {/* <svg className="inline ml-2 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg> */}
          </button>
          {showDropdown && (
            <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
              <button
                onClick={ handleDownload()}
                className="block w-full text-left px-4 py-2 hover:bg-orange-50 rounded-t-xl"
              >
                Download CV (FR)
              </button>
              <button
                onClick={handleDownload()}
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
