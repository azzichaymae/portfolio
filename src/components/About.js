import React from "react";

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6"
    >
    <div className="w-40 h-40 md:w-60 md:h-60 rounded-3xl overflow-hidden shadow-l hover:scale-105 transition-transform">
  <img
    src="images/me.jpeg"
    alt="Chaymae"
    className="w-full h-full object-cover"
  />
</div>



      {/* Text */}
      <div className="mt-8 md:mt-0 md:ml-12 text-center md:text-left max-w-xl">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          About Me
        </h2>
        <p className="mt-4 text-gray-600 leading-relaxed">
          I’m <span className="font-semibold">Chaymae</span>, a dedicated and
          ambitious <span className="text-orange-500">Full Stack Developer</span>.  
          With experience in building e-commerce platforms and digital solutions,
          I enjoy turning ideas into functional, user-friendly applications.  
        </p>
        <p className="mt-4 text-gray-600 leading-relaxed">
          Passionate about technology, problem-solving, and continuous learning,  
          I aim to deliver clean code, creative solutions, and impactful digital experiences.  
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
