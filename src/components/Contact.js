import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-8">
          Contact Me
        </h2>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
          <button
            type="submit"
            className="bg-[#F97316] hover:bg-[#ea580c] text-white px-6 py-2 rounded-md font-medium transition"
          >
            Send Message
          </button>
        </form>

        {/* Resume Download */}
        <div className="mt-8">
          <a
            href="/CV-en.pdf"
            download
            className="text-[#F97316] underline hover:text-[#ea580c]"
          >
            Download My Resume (PDF)
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
