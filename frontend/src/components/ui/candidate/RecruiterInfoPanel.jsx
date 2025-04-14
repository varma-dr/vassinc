// components/ui/candidate/RecruiterInfoPanel.jsx
import React from "react";
import { Copy } from "lucide-react";

const recruiter = {
  name: "Srikanth",
  email: "srikanth@vassinc.com",
  phone: "+1 (123) 456-7890",
  company: "Vass Inc"
};

const RecruiterInfoPanel = () => {
  const handleCopy = () => {
    const fullInfo = `
Recruiter: ${recruiter.name}
Email: ${recruiter.email}
Phone: ${recruiter.phone}
Company: ${recruiter.company}
    `.trim();
    navigator.clipboard.writeText(fullInfo);
    alert("Recruiter details copied to clipboard!");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Recruiter Information</h2>

      <div className="bg-white shadow rounded-2xl p-6 space-y-4">
        <label className="block text-sm text-gray-600 mb-1">Assigned Recruiter</label>
        <div className="flex items-start justify-between border rounded px-3 py-3">
          <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">
            <strong>{recruiter.name}</strong><br />
            Email: {recruiter.email}<br />
            Phone: {recruiter.phone}<br />
            Company: {recruiter.company}
          </div>
          <Copy
            className="w-5 h-5 mt-1 ml-3 cursor-pointer text-gray-500 hover:text-blue-600"
            onClick={handleCopy}
          />
        </div>
      </div>
    </div>
  );
};

export default RecruiterInfoPanel;
