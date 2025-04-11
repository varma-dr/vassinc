// components/ui/recruiter/CandidateManagementPanel.jsx
import React, { useState } from "react";
import {
  MessageSquare,
  User,
  FilePlus2,
  CalendarClock,
} from "lucide-react";

const dummyCandidates = [
  {
    id: 1,
    name: "Anjali Verma",
    specialization: "Frontend Developer",
    visa: "H1B",
    active: true,
    submissions: 4,
    priority: true,
    assignedTo: "You",
  },
  {
    id: 2,
    name: "Ravi Kumar",
    specialization: "Backend Developer",
    visa: "F1-OPT",
    active: false,
    submissions: 2,
    priority: false,
    assignedTo: "Other Recruiter",
  },
  {
    id: 3,
    name: "Sara Thomas",
    specialization: "Data Analyst",
    visa: "GC",
    active: true,
    submissions: 5,
    priority: true,
    assignedTo: "You",
  },
];

export const CandidateManagementPanel = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const filteredCandidates = dummyCandidates
    .filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.specialization.toLowerCase().includes(search.toLowerCase()) ||
        c.visa.toLowerCase().includes(search.toLowerCase()) ||
        c.assignedTo.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (a.assignedTo === "You" && b.assignedTo !== "You") return -1;
      if (a.assignedTo !== "You" && b.assignedTo === "You") return 1;
      if (sortBy === "status") return b.active - a.active;
      if (sortBy === "submissions") return b.submissions - a.submissions;
      return b.id - a.id; // newest first
    });

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Candidate Management</h2>

      <div className="flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Search by name, role, visa, activity..."
          className="p-2 border rounded w-60"
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="p-2 border rounded"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="newest">Sort: Newest</option>
          <option value="submissions">Most Submissions</option>
          <option value="status">Activity Status</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredCandidates.map((c) => (
          <div
            key={c.id}
            className="border rounded-2xl p-4 shadow bg-white relative"
          >
            {c.priority && (
              <span className="absolute top-2 right-2 text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                High Priority
              </span>
            )}

            <div className="flex items-center gap-4 mb-3">
              <div className="bg-blue-100 text-blue-800 rounded-full h-12 w-12 flex items-center justify-center text-xl font-bold">
                {c.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </div>
              <div>
                <div className="font-semibold text-lg">{c.name}</div>
                <div className="text-sm text-gray-600">{c.specialization}</div>
              </div>
            </div>

            <div className="text-sm text-gray-700 space-y-1 mb-4">
              <div>Visa Status: <span className="font-medium">{c.visa}</span></div>
              <div>
                Activity: <span className={`font-medium ${c.active ? "text-green-600" : "text-gray-400"}`}>
                  {c.active ? "Active" : "Inactive"}
                </span>
              </div>
              <div>Submissions: {c.submissions}</div>
              <div>Assigned To: <span className="font-medium">{c.assignedTo}</span></div>
            </div>

            
          </div>
        ))}
      </div>
    </div>
  );
};
