import React from "react";
import Logo from "../../../assets/VassInc_logo.png";
import {
  LayoutDashboard,
  FileText,
  UserCircle,
  Users
} from "lucide-react";

const Sidebar = ({ setActivePanel, greeting, name }) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard /> },
    { id: "submissions", label: "Submissions", icon: <FileText /> },
    { id: "recruiter", label: "Recruiter Info", icon: <Users /> },
    { id: "personal", label: "Personal Info", icon: <UserCircle /> }
  ];

  return (
    <div className="w-64 bg-white shadow-md flex flex-col p-4">
      {/* Logo and greeting */}
      <div className="mb-10 text-center">
        <img src={Logo} alt="Company Logo" className="h-16 mx-auto" />
        <p className="text-lg font-semibold mt-2">
          {greeting}, {name || "Candidate"}!
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-2">
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

export default Sidebar;
