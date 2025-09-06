import React, { useState } from 'react';
import emailjs from '@emailjs/browser'; // Updated library
import Modal from 'react-modal';

// Bind modal to your app's root element (required for accessibility)
Modal.setAppElement('#root');

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);

    emailjs
      .sendForm(
        'service_6y3ju3b', // Your Service ID
        'template_p7xit9o', // Your Template ID
        e.target,
        'ixni1J5sAPLDKH07U' // Your Public Key
      )
      .then(
        (result) => {
          console.log(result.text);
          setModalMessage('Message sent successfully!');
          setIsSuccess(true);
          setIsModalOpen(true);
          e.target.reset(); // Reset form after success
        },
        (error) => {
          console.log(error.text);
          setModalMessage('Failed to send the message, please try again.');
          setIsSuccess(false);
          setIsModalOpen(true);
        }
      )
      .finally(() => {
        setIsLoading(false); // Stop loading regardless of success or failure
      });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-8">
          Contact Me
        </h2>
        <form className="space-y-4" onSubmit={sendEmail}>
          <input
            type="text"
            name="name" // Matches {{name}} in template
            placeholder="Your Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="email"
            name="email" // Matches {{email}} in template
            placeholder="Your Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
          <textarea
            name="message" // Matches {{message}} in template
            placeholder="Your Message"
            rows="5"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#F97316] hover:bg-[#ea580c] text-white px-6 py-2 rounded-md font-medium transition"
          >
            {isLoading ? 'Sending...' : 'Send Message'}
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

      {/* Modal for Alerts */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '300px',
            textAlign: 'center',
            padding: '20px',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
        contentLabel="Email Status"
      >
        <h2>{isSuccess ? 'Success' : 'Error'}</h2>
        <p>{modalMessage}</p>
        <button
          onClick={closeModal}
          className="mt-4 bg-[#F97316] hover:bg-[#ea580c] text-white px-4 py-2 rounded-md"
        >
          Close
        </button>
      </Modal>
    </section>
  );
};

export default Contact;