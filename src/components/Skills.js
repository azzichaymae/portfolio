import React, { useState } from "react";
import { useI18n } from "../hooks/useI18n";
import {
  FaReact,
  FaLaravel,
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaPhp,
  FaGitAlt,
  FaBootstrap,
  FaAngular,
} from "react-icons/fa";
import {
  SiDjango,
  SiMysql,
  SiTailwindcss,
  SiJira,
  SiSymfony,
  SiTypescript,
  SiIonic,
  SiFirebase,
} from "react-icons/si";
import { FiChevronDown } from "react-icons/fi";

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React.js", icon: <FaReact className="text-[#61DAFB]" /> },
      { name: "JavaScript", icon: <FaJs className="text-[#F7DF1E]" /> },
      { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
      { name: "HTML5", icon: <FaHtml5 className="text-[#E34F26]" /> },
      { name: "CSS3", icon: <FaCss3Alt className="text-[#1572B6]" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#06B6D4]" /> },
      { name: "Bootstrap", icon: <FaBootstrap className="text-[#7952B3]" /> },
      { name: "Angular", icon: <FaAngular className="text-[#DD0031]" /> },
      { name: "Ionic", icon: <SiIonic className="text-[#3178C6]" /> },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Laravel", icon: <FaLaravel className="text-[#F9322C]" /> },
      { name: "Django", icon: <SiDjango className="text-[#092E20]" /> },
      { name: "Symfony", icon: <SiSymfony className="text-black" /> },
      { name: "PHP", icon: <FaPhp className="text-[#777BB4]" /> },
      { name: "Python", icon: <FaPython className="text-[#3776AB]" /> },
    ],
  },
  {
    title: "Database & Cloud",
    skills: [
      { name: "MySQL", icon: <SiMysql className="text-[#4479A1]" /> },
      { name: "Firebase", icon: <SiFirebase className="text-[#FFCA28]" /> },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git & GitHub", icon: <FaGitAlt className="text-[#F05032]" /> },
      { name: "Jira", icon: <SiJira className="text-[#0052CC]" /> },
    ],
  },
];

const Skills = () => {
  const { t } = useI18n();
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleCategory = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="skills" className="py-16 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
          {t("Skills.title")}
        </h2>

        <div className="space-y-4">
          {skillCategories.map((category, index) => (
            <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">

               <button
                onClick={() => toggleCategory(index)}
                className="w-full flex justify-between items-center px-6 py-4 bg-gray-50 hover:bg-gray-100 transition"
              >
                <span className="font-semibold text-gray-800">
                  {t(`Skills.${category.title}`) }
                </span>
                <FiChevronDown
                  className={`transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

               <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  activeIndex === index ? "max-h-96 p-6" : "max-h-0"
                }`}
              >
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                  {category.skills.map((skill, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center text-center p-3 rounded-lg hover:bg-gray-50 transition"
                    >
                      <div className="text-2xl mb-1">{skill.icon}</div>
                      <p className="text-sm text-gray-700">{skill.name}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;