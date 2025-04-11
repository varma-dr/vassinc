// components/ui/recruiter/SubmissionsPanel.jsx
import React, { useState } from "react";
import {
  Pencil,
  Trash2,
  Save,
  Plus,
  Search,
  Calendar,
} from "lucide-react";

const candidates = ["Alice Johnson", "Bob Singh", "Carla Mehta"];

const statusOptions = [
  { value: "Submitted", icon: "⏳" },
  { value: "Interview Scheduled", icon: "📅" },
  { value: "Feedback Pending", icon: "🔍" },
  { value: "Selected", icon: "✅" },
  { value: "Rejected", icon: "❌" },
];

const visaOptions = ["H1B", "F1-OPT", "L2", "GC", "USC"];

// Set a reasonable maximum hourly rate
const MAX_HOURLY_RATE = 500;

export const SubmissionsPanel = () => {
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [submissions, setSubmissions] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [rateError, setRateError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const addSubmission = () => {
    if (!selectedCandidate) return alert("Please select a candidate first");
    setSubmissions([
      ...submissions,
      {
        candidate: selectedCandidate,
        date: today,
        company: "",
        position: "",
        location: "",
        visa: "",
        status: "Submitted",
        vendor: "",
        rate: "",
      },
    ]);
    setEditingIndex(submissions.length);
    setRateError("");
  };

  const updateField = (index, field, value) => {
    // If updating the rate field, validate the input
    if (field === "rate") {
      // Clear previous error
      setRateError("");
      
      // Check if the input contains a decimal point
      if (value.includes('.')) {
        setRateError("Only whole numbers are allowed");
        return;
      }
      
      // Check if the rate is within acceptable limits
      const numericValue = parseInt(value, 10);
      
      if (value && (isNaN(numericValue) || numericValue <= 0)) {
        setRateError("Rate must be a positive whole number");
        return;
      }
      
      if (numericValue > MAX_HOURLY_RATE) {
        setRateError(`Rate cannot exceed ${MAX_HOURLY_RATE}/HR`);
        return;
      }
      
      // Format the rate
      value = value ? `${numericValue}/HR` : "";
    }
    
    const updated = [...submissions];
    updated[index][field] = value;
    setSubmissions(updated);
  };

  const saveSubmission = (index) => {
    const item = submissions[index];
    
    // Check for rate error
    if (rateError) {
      alert(`Please fix the rate error: ${rateError}`);
      return;
    }
    
    // Make sure all fields are filled
    const allFilled = Object.values(item).every((v) => v !== "");
    if (!allFilled) {
      alert("Please fill all fields before saving.");
      return;
    }
    
    setEditingIndex(null);
    setRateError("");
  };

  const deleteSubmission = (index) => {
    const updated = [...submissions];
    updated.splice(index, 1);
    setSubmissions(updated);
    setRateError("");
  };

  const filteredSubmissions = submissions.filter((s) =>
    s.company.toLowerCase().includes(filterText.toLowerCase())
  );
  
  // Extract numeric value from rate string for input display
  const extractRateValue = (rateString) => {
    if (!rateString) return "";
    const match = rateString.match(/\$?(\d+)/);
    return match ? match[1] : "";
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Candidate Submissions</h2>

      <div className="flex gap-4 items-center">
        <select
          className="border rounded p-2"
          value={selectedCandidate}
          onChange={(e) => setSelectedCandidate(e.target.value)}
        >
          <option value="">Select Candidate</option>
          {candidates.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        <button
          onClick={addSubmission}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus size={16} /> Add Submission
        </button>
        <div className="ml-auto relative">
          <Search className="absolute left-2 top-2 text-gray-400" size={16} />
          <input
            type="text"
            className="pl-8 pr-3 py-2 border rounded"
            placeholder="Filter by company..."
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded shadow bg-white">
        <table className="min-w-full table-auto text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              {[
                "Date",
                "Company",
                "Position",
                "Location",
                "Visa",
                "Status",
                "Vendor",
                "Rate ($/HR)",
                "Actions",
              ].map((h) => (
                <th key={h} className="px-4 py-2">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredSubmissions.map((sub, index) => (
              <tr key={index} className="border-t">
                {["date", "company", "position", "location", "visa", "status", "vendor", "rate"].map((field) => (
                  <td key={field} className="px-4 py-2">
                    {editingIndex === index ? (
                      field === "status" ? (
                        <select
                          value={sub[field]}
                          onChange={(e) => updateField(index, field, e.target.value)}
                          className="border rounded p-1"
                        >
                          {statusOptions.map((s) => (
                            <option key={s.value} value={s.value}>
                              {s.icon} {s.value}
                            </option>
                          ))}
                        </select>
                      ) : field === "visa" ? (
                        <select
                          value={sub[field]}
                          onChange={(e) => updateField(index, field, e.target.value)}
                          className="border rounded p-1"
                        >
                          <option value="">Select Visa</option>
                          {visaOptions.map((v) => (
                            <option key={v} value={v}>{v}</option>
                          ))}
                        </select>
                      ) : field === "rate" ? (
                        <div>
                          <input
                            type="number"
                            min="1"
                            max={MAX_HOURLY_RATE}
                            step="1"
                            value={extractRateValue(sub[field])}
                            onChange={(e) => updateField(index, field, e.target.value)}
                            className={`border rounded p-1 w-full ${rateError ? 'border-red-500' : ''}`}
                          />
                          {rateError && editingIndex === index && field === "rate" && (
                            <div className="text-red-500 text-xs mt-1">{rateError}</div>
                          )}
                        </div>
                      ) : field === "date" ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="date"
                            min={today}
                            value={sub[field]}
                            onChange={(e) => updateField(index, field, e.target.value)}
                            className="border rounded p-1"
                          />
                          <button
                            onClick={() => updateField(index, field, today)}
                            className="text-xs text-blue-500 underline"
                          >
                            Today
                          </button>
                        </div>
                      ) : (
                        <input
                          type="text"
                          value={sub[field]}
                          onChange={(e) => updateField(index, field, e.target.value)}
                          className="border rounded p-1 w-full"
                        />
                      )
                    ) : field === "status" ? (
                      <>{statusOptions.find((s) => s.value === sub.status)?.icon} {sub.status}</>
                    ) : (
                      sub[field]
                    )}
                  </td>
                ))}
                <td className="px-4 py-2 flex gap-2">
                  {editingIndex === index ? (
                    <button onClick={() => saveSubmission(index)} className="text-green-600">
                      <Save size={18} />
                    </button>
                  ) : (
                    <button onClick={() => setEditingIndex(index)} className="text-blue-600">
                      <Pencil size={18} />
                    </button>
                  )}
                  <button onClick={() => deleteSubmission(index)} className="text-red-600">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredSubmissions.length === 0 && (
              <tr>
                <td colSpan={9} className="text-center py-4 text-gray-500 italic">
                  No submissions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};