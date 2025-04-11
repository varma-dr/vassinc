import React, { useState, useEffect } from "react";
import Sidebar from "./recruiter/Sidebar";
import { DashboardPanel } from "./recruiter/DashboardPanel";
import { SubmissionsPanel } from "./recruiter/SubmissionsPanel";
import { CandidateManagementPanel } from "./recruiter/CandidateManagementPanel";
import { LeavePanel } from "./recruiter/LeavePanel";
import { RecruiterInfoPanel } from "./recruiter/RecruiterInfoPanel";
import { UserCircle, LogOut } from "lucide-react";



function RecruiterDashboard() {
  const [activePanel, setActivePanel] = useState("dashboard");
  const [greeting, setGreeting] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [userInfo, setUserInfo] = useState({ firstName: "", lastName: "" });

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  const renderPanel = () => {
    switch (activePanel) {
      case "dashboard":
        return <DashboardPanel />;
      case "submissions":
        return <SubmissionsPanel />;
      case "candidates":
        return <CandidateManagementPanel />;
      case "leave":
        return <LeavePanel />;
      case "recruiter":
        return <RecruiterInfoPanel setProfilePic={setProfilePic} setUserInfo={setUserInfo} />;
      default:
        return <DashboardPanel />;
    }
  };

  const initials = `${userInfo.firstName[0] || ""}${userInfo.lastName[0] || ""}`.toUpperCase();

  const handleLogout = () => {
    alert("Logging out...");
    // Implement actual logout logic
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar setActivePanel={setActivePanel} greeting={greeting} />

      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="flex justify-end p-4 relative">
          <div
            className="cursor-pointer flex items-center space-x-2"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {profilePic ? (
              <img
                src={URL.createObjectURL(profilePic)}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center font-bold">
                {initials || <UserCircle />}
              </div>
            )}
          </div>

          {showDropdown && (
            <div className="absolute right-4 top-16 bg-white shadow rounded p-2 w-40 z-10">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 px-3 py-2 w-full hover:bg-gray-100 rounded"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>

        <div className="flex-1 p-4 overflow-y-auto">{renderPanel()}</div>
      </div>
    </div>
  );
}

export default RecruiterDashboard;
