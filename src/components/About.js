import React from "react";
import Logo from "./Logo"

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6"
    >
      {/* <div className="w-40 h-40 md:w-60 md:h-60 rounded-3xl overflow-hidden shadow-l hover:scale-105 transition-transform">
        <img
          src="images/engineer.png"
          alt="Chaymae"
          className="w-full h-full object-cover"
        />
      </div> */}

      {/* Text */}
      <Logo/>
      <div className="mt-8 md:mt-0 md:ml-12 text-center md:text-left max-w-xl">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          About Me
        </h2>
<p className="mt-4 text-gray-600 leading-relaxed">
  I’m <span className="font-semibold">Chaymae Azzi</span>, a dedicated and ambitious 
  <span className="text-orange-500"> Full Stack Developer and aspiring Software Engineer</span>, currently in my fifth year of the Software Engineering program at <span className="font-semibold">SUPMTI</span>. 
  Skilled in React.js, Laravel, Django, SpringBoot, and MySQL, I build complete applications—from designing interfaces to managing data persistence—and enjoy turning ideas into functional, user-friendly solutions.
</p>
<p className="mt-4 text-gray-600 leading-relaxed">
  Versatile and passionate about technology, problem-solving, and continuous learning, I focus on writing clean code, delivering creative solutions, and contributing to innovative end-to-end projects.
</p>



        <a
          href="#projects"
          className="inline-block mt-6 px-6 py-3 bg-orange-500 text-white rounded-xl shadow-md hover:bg-orange-600 transition"
        >
          Explore My Work
        </a>
      </div>
    </section>
  );
}
