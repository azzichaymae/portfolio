import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Invalid email format"
    )
    .required("Email is required"),

    message: Yup.string().required("Message is required"),
  });

  const sendEmail = (values, { resetForm }) => {
    setIsLoading(true);

    emailjs
      .send("service_6y3ju3b", "template_p7xit9o", values, "ixni1J5sAPLDKH07U")
      .then(
        () => {
          setModalMessage("Message sent successfully!");
          setIsSuccess(true);
          setIsModalOpen(true);
          resetForm();
        },
        () => {
          setModalMessage("Failed to send the message, please try again.");
          setIsSuccess(false);
          setIsModalOpen(true);
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-8">
          Contact Me
        </h2>

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            message: "",
          }}
          validationSchema={validationSchema}
          onSubmit={sendEmail}
        >
          <Form className="space-y-4">
            <div className="flex gap-4">
              <div className="w-full">
                <Field
                  name="firstName"
                  placeholder="Your First Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="w-full">
                <Field
                  name="lastName"
                  placeholder="Your Last Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
              </div>
            </div>

            <Field
              name="email"
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

            <Field
              name="message"
              as="textarea"
              rows="5"
              placeholder="Your Message"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            <ErrorMessage name="message" component="div" className="text-red-500 text-sm" />

            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#F97316] hover:bg-[#ea580c] text-white px-6 py-2 rounded-md font-medium transition"
            >
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          </Form>
        </Formik>

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

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={{
          content: {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "300px",
            textAlign: "center",
            padding: "20px",
            borderRadius: "0.5rem",
            backgroundColor: "#fff",
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          },
        }}
        contentLabel="Email Status"
      >
        <h2 className="text-xl font-semibold">
          {isSuccess ? "✅ Message Sent!" : "❌ Error"}
        </h2>
        <p className="mt-2">{modalMessage}</p>
        <button
          onClick={() => setIsModalOpen(false)}
          className="mt-4 bg-[#F97316] hover:bg-[#ea580c] text-white px-4 py-2 rounded-md"
        >
          Close
        </button>
      </Modal>
    </section>
  );
};

export default Contact;