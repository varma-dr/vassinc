// components/ui/candidate/SubmissionsPanel.jsx
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp
} from "lucide-react";

const statusIcons = {
  Submitted: "⏳",
  "Interview Scheduled": "📅",
  "Feedback Pending": "🔍",
  Selected: "✅",
  Rejected: "❌"
};

const dummyData = [
  {
    date: "2025-04-10",
    company: "ABC Corp",
    position: "Frontend Developer",
    location: "New York",
    visa: "H1B",
    status: "Submitted",
    vendor: "XYZ Staffing",
    rate: "$70/hr"
  },
  {
    date: "2025-04-08",
    company: "TechSoft",
    position: "UI Engineer",
    location: "Dallas",
    visa: "F1-OPT",
    status: "Interview Scheduled",
    vendor: "GlobalTech",
    rate: "$65/hr"
  },
  {
    date: "2025-04-05",
    company: "Innovate Inc",
    position: "React Developer",
    location: "Seattle",
    visa: "GC",
    status: "Selected",
    vendor: "NextHire",
    rate: "$75/hr"
  }
];

const SubmissionsPanel = () => {
  const [filter, setFilter] = useState("");
  const [sortKey, setSortKey] = useState("date");
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (key) => {
    if (key === sortKey) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const filtered = dummyData
    .filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      if (sortKey === "rate") {
        const numA = parseInt(a.rate.replace(/\D/g, ""));
        const numB = parseInt(b.rate.replace(/\D/g, ""));
        return sortAsc ? numA - numB : numB - numA;
      } else {
        return sortAsc
          ? a[sortKey].localeCompare(b[sortKey])
          : b[sortKey].localeCompare(a[sortKey]);
      }
    });

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Submissions</h2>

      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Filter by company, position, visa..."
          className="border rounded px-3 py-2 w-72"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto rounded-lg shadow bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {["date", "company", "position", "location", "visa", "status", "vendor", "rate"].map((col) => (
                <th
                  key={col}
                  className="px-4 py-2 text-left text-sm font-medium text-gray-700 cursor-pointer"
                  onClick={() => handleSort(col)}
                >
                  <div className="flex items-center gap-1 capitalize">
                    {col}
                    {sortKey === col ? sortAsc ? <ChevronUp size={14} /> : <ChevronDown size={14} /> : null}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {filtered.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-2">{row.date}</td>
                <td className="px-4 py-2">{row.company}</td>
                <td className="px-4 py-2">{row.position}</td>
                <td className="px-4 py-2">{row.location}</td>
                <td className="px-4 py-2">{row.visa}</td>
                <td className="px-4 py-2">
                  <span className="flex items-center gap-1">
                    {statusIcons[row.status]} {row.status}
                  </span>
                </td>
                <td className="px-4 py-2">{row.vendor}</td>
                <td className="px-4 py-2">{row.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="p-4 text-center text-gray-500">No submissions found.</div>
        )}
      </div>
    </div>
  );
};

export default SubmissionsPanel;
