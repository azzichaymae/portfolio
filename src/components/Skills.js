import React from 'react';
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
  FaFigma,
  FaBootstrap,
} from 'react-icons/fa';
import { SiDjango, SiMysql, SiTailwindcss, SiJira, SiSymfony, SiTypescript } from 'react-icons/si';

const skills = [
  { name: 'React.js', icon: <FaReact className="text-[#61DAFB]" /> },
  { name: 'Laravel', icon: <FaLaravel className="text-[#F9322C]" /> },
  { name: 'Django', icon: <SiDjango className="text-[#092E20]" /> },
  { name: 'JavaScript', icon: <FaJs className="text-[#F7DF1E]" /> },
  { name: 'TypeScript', icon: <SiTypescript className="text-[#3178C6]" /> },
  { name: 'PHP', icon: <FaPhp className="text-[#777BB4]" /> },
  { name: 'HTML5', icon: <FaHtml5 className="text-[#E34F26]" /> },
  { name: 'CSS3', icon: <FaCss3Alt className="text-[#1572B6]" /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-[#06B6D4]" /> },
  { name: 'Bootstrap', icon: <FaBootstrap className="text-[#7952B3]" /> },
  { name: 'MySQL', icon: <SiMysql className="text-[#4479A1]" /> },
  { name: 'Git & GitHub', icon: <FaGitAlt className="text-[#F05032]" /> },
  { name: 'Figma', icon: <FaFigma className="text-[#F24E1E]" /> },
  { name: 'Jira', icon: <SiJira className="text-[#0052CC]" /> },
  { name: 'Symfony', icon: <SiSymfony className="text-black" /> },
];

const Skills = () => {
   const { t } = useI18n();
  return (
    <section id="skills" className=" pb-10 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-8">
          {t('Skills.title')}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-white border border-[#E5E7EB] p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300 flex flex-col items-center"
            >
              <div className="text-3xl mb-2">{skill.icon}</div>
              <p className="text-[#1F2937] font-medium">{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
