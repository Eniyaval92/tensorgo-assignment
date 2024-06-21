import React, { useState } from "react";
import { sendEmail } from "../api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ComposeEmail = () => {
  const [emailData, setEmailData] = useState({
    to: "",
    subject: "",
    body: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData({
      ...emailData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendEmail(emailData);
      toast.success("Email sent successfully!");
      setEmailData({
        to: "",
        subject: "",
        body: "",
      });
    } catch (error) {
      toast.error("Failed to send email.");
    }
  };

  return (
    <div className="p-4 mx-auto max-w-3xl bg-white font-sans mt-20 border rounded-lg shadow-md">
      <ToastContainer />
      <h2 className="text-3xl text-gray-800 font-bold text-left">
        Compose Email
      </h2>
      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        <input
          type="email"
          name="to"
          placeholder="To"
          value={emailData.to}
          onChange={handleChange}
          className="w-full rounded-md py-3 px-4 text-gray-800 bg-gray-100 focus:bg-white text-sm outline-blue-500 border border-gray-300 focus:border-blue-500"
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={emailData.subject}
          onChange={handleChange}
          className="w-full rounded-md py-3 px-4 text-gray-800 bg-gray-100 focus:bg-white text-sm outline-blue-500 border border-gray-300 focus:border-blue-500"
        />
        <textarea
          name="body"
          placeholder="Body"
          value={emailData.body}
          onChange={handleChange}
          className="w-full rounded-md px-4 text-gray-800 bg-gray-100 focus:bg-white text-sm pt-3 outline-blue-500 border border-gray-300 focus:border-blue-500"
          rows="6"
        />
        <button
          type="submit"
          className="text-white bg-blue-500 hover:bg-blue-600 tracking-wide rounded-md text-sm px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ComposeEmail;
