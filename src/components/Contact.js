import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";
import Modal from "react-modal";
import { useI18n } from "../hooks/useI18n";
Modal.setAppElement("#root");

const Contact = () => {
    const { t } = useI18n();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const validationSchema = Yup.object({
    firstName: Yup.string().required(t("Contact.errorfn")),
    lastName: Yup.string().required(t("Contact.errorln")),
    email: Yup.string()
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      t("Contact.emailformat")
    )
    .required(t("Contact.errorem")),

    message: Yup.string().required(t("Contact.errormsg")),
  });

  const sendEmail = (values, { resetForm }) => {
    setIsLoading(true);

    emailjs
      .send("service_6y3ju3b", "template_p7xit9o", values, "ixni1J5sAPLDKH07U")
      .then(
        () => {
          setModalMessage(t("Contact.success"));
          setIsSuccess(true);
          setIsModalOpen(true);
          resetForm();
        },
        () => {
          setModalMessage(t("Contact.fail"));
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
          {t("Contact.title")}
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
                  placeholder={t("Contact.fn")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="w-full">
                <Field
                  name="lastName"
                  placeholder={t("Contact.ln")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
              </div>
            </div>

            <Field
              name="email"
              type="email"
              placeholder={t("Contact.email")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

            <Field
              name="message"
              as="textarea"
              rows="5"
              placeholder={t("Contact.msg")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            <ErrorMessage name="message" component="div" className="text-red-500 text-sm" />

            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#F97316] hover:bg-[#ea580c] text-white px-6 py-2 rounded-md font-medium transition"
            >
              {isLoading ? t("Contact.sending") : t("Contact.send")}
            </button>
          </Form>
        </Formik>

        <div className="mt-8">
          <a
            href="/CV-en.pdf"
            download
            className="text-[#F97316] underline hover:text-[#ea580c]"
          >
            {t("pdf")}
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