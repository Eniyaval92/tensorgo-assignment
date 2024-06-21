import React, { useEffect, useState } from "react";
import { fetchEmailHistory } from "../api";
import { FiRefreshCcw } from "react-icons/fi";

const EmailHistory = () => {
  const [emails, setEmails] = useState([]);

  const fetchData = async () => {
    try {
      const result = await fetchEmailHistory();
      setEmails(result.data);
    } catch (error) {
      console.error("Failed to fetch email history", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4 mx-auto max-w-3xl bg-white font-sans mt-20 border rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Email History</h2>
        <button
          onClick={fetchData}
          className="p-2 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          <FiRefreshCcw className="text-xl" />
        </button>
      </div>
      <div className="space-y-4">
        {emails.map((email, index) => (
          <div
            key={index}
            className="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex justify-between items-center mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {email.email.subject}
                </h3>
                <p className="text-sm text-gray-500">To: {email.email.to}</p>
              </div>

              <span
                className={`text-xl ${
                  email.type === "received" ? "text-blue-500" : "text-green-500"
                }`}
              >
                {email.type === "received" ? "↙" : "↗"}
              </span>
            </div>
            <p className="text-md text-gray-700 mb-2">{email.email.body}</p>
            <p className="text-sm text-gray-500">{email.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmailHistory;
