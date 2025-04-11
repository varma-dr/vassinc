// src/components/ui/Sidebar.jsx
import React from "react";
import Logo from "../../../assets/VassInc_logo.png";
import {
  LayoutDashboard,
  FileText,
  Users,
  CalendarDays,
  UserCircle,
} from "lucide-react";

export const Sidebar = ({ setActivePanel, greeting }) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard /> },
    { id: "submissions", label: "Submissions", icon: <FileText /> },
    { id: "candidates", label: "Candidate Management", icon: <Users /> },
    { id: "leave", label: "Apply for Leave", icon: <CalendarDays /> },
    { id: "recruiter", label: "Recruiter Info", icon: <UserCircle /> },
  ];

  return (
    <div className="w-64 bg-white shadow-md flex flex-col p-4">
      <div className="flex flex-col items-center mb-6">
        <img src={Logo} alt="Company Logo" className="h-16" />
        <span className="text-lg font-semibold text-gray-800 mt-2">{greeting}</span>
      </div>

      <nav className="flex flex-col space-y-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePanel(item.id)}
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-left text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-all"
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};
