import React, { useState, useMemo } from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";



export default function Projects() {

    const [showVideo, setShowVideo] = useState(false);

  const tabs = [
    { label: "Projects", key: "projects" },
    { label: "Certificates", key: "certificates" },
    { label: "Tech", key: "tech" },
  ];

  const projects = [
    {
      title: "Mugs Atelier",
      description:
        "A full-featured e-commerce platform for custom mug sales. Users can browse, personalize, and purchase mugs. Built with React.js for the frontend, Django for the backend, and MySQL for data storage. Project management handled via Jira.",
      tech: ["React", "Django", "MySQL", "Tailwind CSS", "Jira"],
      github: "https://github.com/azzichaymae/Mugs-atelier",
      picture: "/images/ma.png",
    },
    {
      title: "Contactly",
      description:
        "A CRM-inspired web application for managing contacts, companies, and deals. Developed using Symfony and MySQL, it features CRUD operations, search, and user authentication.",
      tech: ["Symfony", "MySQL", "Bootstrap"],
      github: "https://github.com/azzichaymae/ContactlyProject",
      
      picture: "/images/contact.png",
    },
    {
      title: "BuildFolio",
      description:
        "A portfolio builder app that allows users to create and customize their own professional portfolios. Built with SpringBoot for the backend, React for the frontend and MySQL for persistent storage.",
      tech: ["SpringBoot", "React", "MySQL", "Bootstrap", "Tailwind CSS"],
      github: "https://github.com/azzichaymae/buildfolio/tree/master",
      
      picture: "/images/builfolio.png",
    },
    {
      title: "SUPAbscence",
      description:
        "A desktop application designed to automate student absence management. Built with JavaFX, it streamlines attendance tracking and generates Excel reports automatically. Developed as an innovative solution during my studies at SUPMTI.",
      tech: ["JavaFX", "MySQL"],
      github: "",
      
      picture: "/images/ab2.jpg",
    },
    {
      title: "Les Douceures de Maroc",
      description:
        "A responsive website for a Moroccan sweets business, showcasing products and enabling online orders. Developed with React and Bootstrap for a seamless user experience.",
      tech: ["React", "Bootstrap", "Typescript"],
      github: "https://github.com/azzichaymae/projet2",
      live: "https://www.faragroupe.fr/",
      picture: "/images/faragroupe.png",
    },
    {
      title: "Task Master",
      description:
        "A desktop application for efficient task and time management, featuring to-do lists, reminders, and progress tracking. Built with JavaFX for a responsive and intuitive user interface.",
      tech: ["JavaFX", "MySQL", "Bootstrap"],
      github: "https://github.com/yourusername/task-master",
      
      picture: "/images/task.png",
    },
    {
      title: "Insurance Platform",
      description:
        "A web-based platform for managing insurance policies, clients, and payments. Developed during an internship at Sangam using Laravel for the backend and React for the frontend. Includes dashboards, reporting, and secure authentication.",
      tech: ["Laravel", "React", "MySQL", "Bootstrap"],
      github: "https://github.com/azzichaymae/Projet_SANLAM",
      
      picture: "/images/Picture1.png",
    },
  ];

  const certificates = [
    { name: "Introduction to Data Science", issuer: "Cisco", date: "2025" },
    { name: "Active Participation in a Soft Skills Workshop Certificate", issuer: "SUPMTI", date: "2024" },
    { name: "Microsoft Office Expert Certification", issuer: "MICROSOFT", date: "2020" },
    { name: "Certificate of Training in Office Computing", issuer: "E.F.T.I.G", date: "2019" },
  ];

  const techStack = [
    "React",
    "Django",
    "SpringBoot",
    "Laravel",
    "JavaFX",
    "Symfony",
    "MongoDB",
    "MySQL",
  ];

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const visibleProjects = useMemo(() => (showAllProjects ? projects : projects.slice(0, 3)), [showAllProjects, projects]);
const ProjectCard = ({ project, index }) => (
  <motion.div
    key={index}
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
    whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
    className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl"
  >
    <img
      src={project.picture}
      alt={project.title}
      loading="lazy"
      className="w-full h-48 object-cover"
    />
    <div className="px-6 py-4 flex flex-col flex-1">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
        {project.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-1">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map((tech, i) => (
          <span
            key={i}
            className="text-xs bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 px-3 py-1 rounded-full font-medium"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="flex gap-3 mt-auto">
        
          <a
            {...(project.live
              ? { href: project.live, target: "_blank", rel: "noopener noreferrer" }
              : { onClick: (e) => { e.preventDefault(); setShowVideo(true); } }
            )}
            aria-label={`View live demo of ${project.title}`}
            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-orange-600 hover:to-orange-700 transition-all"
          >
            <FaExternalLinkAlt /> Live
          </a>
       
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View GitHub repository for ${project.title}`}
            className="flex items-center gap-2 bg-gray-800 dark:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-900 dark:hover:bg-black transition-all"
          >
            <FaGithub /> GitHub
          </a>
        )}
      </div>
    </div>
  </motion.div>
);
  return (
    <section id="projects" className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 text-center mb-12">
          My Work
        </h2>
        <nav className="flex justify-center gap-6 mb-12 text-sm sm:text-base">
          <ul className="flex gap-3 relative">
            {tabs.map((tab) => (
              <motion.li
                key={tab.key}
                onClick={() => setActiveTab(tab)}
                className="relative cursor-pointer px-4 py-2 font-semibold text-gray-700 dark:text-gray-300 rounded-sm"
                initial={false}
                animate={{
                  color: activeTab.key === tab.key ? "#ffffff" : "#374151",
                  backgroundColor: activeTab.key === tab.key ? "#f97316" : "#e5e7eb",
                }}
                transition={{ duration: 0.2 }}
                role="tab"
                aria-selected={activeTab.key === tab.key}
              >
                {tab.label}
                {activeTab.key === tab.key && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 right-0 bottom-0 h-1 bg-white rounded-full"
                  />
                )}
              </motion.li>
            ))}
          </ul>
        </nav>

        <main>
          <AnimatePresence mode="wait">
            {activeTab.key === "projects" && (
              <motion.div
                key="projects"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {visibleProjects.map((project, index) => (
                  <ProjectCard key={index} project={project} index={index} />
                ))}
              </motion.div>
            )}
            {projects.length > 3 && activeTab.key === "projects" &&(
              <div className="mt-8 text-center">
                <button
                  onClick={() => setShowAllProjects(!showAllProjects)}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:from-orange-600 hover:to-orange-700 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                  aria-label={showAllProjects ? "Show fewer projects" : "Show more projects"}
                >
                  {showAllProjects ? "Show Less" : "Show More"}
                </button>
              </div>
            )}

            {activeTab.key === "certificates" && (
              <motion.div
                key="certificates"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {certificates.map((cert, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 text-gray-800 dark:text-gray-100"
                  >
                    <h3 className="font-semibold text-lg">{cert.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Issuer: {cert.issuer} | Year: {cert.date}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab.key === "tech" && (
              <motion.div
                key="tech"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="flex flex-wrap gap-3 justify-center"
              >
                {techStack.map((tech, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 px-4 py-2 rounded-lg font-semibold text-sm"
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {showVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            >
              <div className="relative w-11/12 md:w-3/4 lg:w-1/2">
                <button
                  onClick={() => setShowVideo(false)}
                  className="absolute -top-8 right-0 text-white text-3xl font-bold hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  aria-label="Close video modal"
                >
                  &times;
                </button>
                <video
                  src="/videos/Faragroup.mp4"
                  controls
                  autoPlay
                  className="rounded-xl shadow-lg w-full"
                />
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </section>
  );
}