import React from "react";
import Logo from "./Logo";
import { useI18n } from "../hooks/useI18n";
import { Trans } from "react-i18next";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
export default function About() {
  const { t } = useI18n();

  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col md:flex-row items-center justify-center px-6 overflow-hidden bg-[#f8f6f2]"
    >
      <div className="absolute w-72 h-72 bg-orange-200/30 rounded-full blur-3xl top-10 left-10 animate-pulse" />
      <div className="absolute w-96 h-96 bg-blue-200/30 rounded-full blur-3xl bottom-10 right-10 animate-pulse" />

      <motion.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Logo />
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mt-10 md:mt-0 md:ml-16 text-center md:text-left max-w-xl relative z-10"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {t("AboutMe.title")}
        </h2>
         <div className="text-xl md:text-2xl font-semibold text-orange-500 mb-6 h-10">
          <TypeAnimation
            sequence={[
              "Full Stack Developer",
              1500,
              "Software Engineer",
              1500,
              "Problem Solver",
              1500,
              "Tech Enthusiast",
              1500,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </div>

        <p className="text-gray-600 leading-relaxed">
          <Trans i18nKey="AboutMe.description1">
            I’m <span className="font-semibold">Chaymae Azzi</span>, a dedicated
            and ambitious
            <span className="relative text-orange-500 font-semibold">
              {" "}
              Full Stack Developer and aspiring Software Engineer
              <span className="absolute left-0 -bottom-1 w-full h-1 bg-orange-300 animate-pulse" />
            </span>
            , currently in my fifth year of the Software Engineering program at
            <span className="font-semibold"> SUPMTI</span>.
          </Trans>
        </p>

        <p className="mt-4 text-gray-600 leading-relaxed">
          <Trans i18nKey="AboutMe.description2">
            Versatile and passionate about technology, problem-solving, and
            continuous learning, I focus on writing clean code, delivering
            creative solutions, and contributing to innovative end-to-end
            projects.
          </Trans>
        </p>

        <motion.a
          href="#projects"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="inline-block mt-8 px-8 py-3 bg-orange-500 text-white rounded-2xl shadow-lg relative overflow-hidden"
        >
          <span className="relative z-10">
            {t("AboutMe.button")}
          </span>
          <span className="absolute inset-0 bg-orange-600 opacity-0 hover:opacity-100 transition duration-300 rounded-2xl" />
        </motion.a>
      </motion.div>
    </section>
  );
}