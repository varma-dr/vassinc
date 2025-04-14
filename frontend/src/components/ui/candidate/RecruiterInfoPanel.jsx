// components/ui/candidate/RecruiterInfoPanel.jsx
import React from "react";
import { Copy } from "lucide-react";

const recruiter = {
  name: "Srikanth Vassinc",
  email: "srikanth@vassinc.com",
  phone: "+1 (123) 456-7890",
  company: "Vass Inc"
};

const RecruiterInfoPanel = () => {
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Recruiter Information</h2>

      <div className="bg-white shadow rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-600">Recruiter Name</label>
            <div className="flex justify-between items-center border rounded px-3 py-2">
              <span>{recruiter.name}</span>
              <Copy
                className="w-4 h-4 cursor-pointer text-gray-500 hover:text-blue-500"
                onClick={() => handleCopy(recruiter.name)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600">Email</label>
            <div className="flex justify-between items-center border rounded px-3 py-2">
              <span>{recruiter.email}</span>
              <Copy
                className="w-4 h-4 cursor-pointer text-gray-500 hover:text-blue-500"
                onClick={() => handleCopy(recruiter.email)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600">Phone Number</label>
            <div className="flex justify-between items-center border rounded px-3 py-2">
              <span>{recruiter.phone}</span>
              <Copy
                className="w-4 h-4 cursor-pointer text-gray-500 hover:text-blue-500"
                onClick={() => handleCopy(recruiter.phone)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600">Company</label>
            <div className="flex justify-between items-center border rounded px-3 py-2">
              <span>{recruiter.company}</span>
              <Copy
                className="w-4 h-4 cursor-pointer text-gray-500 hover:text-blue-500"
                onClick={() => handleCopy(recruiter.company)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterInfoPanel;
