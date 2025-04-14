import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

// Sample weekly and monthly data
const weeklyData = [
  { name: "Week 1", Submissions: 5, Interviews: 2 },
  { name: "Week 2", Submissions: 8, Interviews: 4 },
  { name: "Week 3", Submissions: 4, Interviews: 1 },
  { name: "Week 4", Submissions: 7, Interviews: 3 }
];

const monthlyData = [
  { name: "Jan", Submissions: 25, Interviews: 10 },
  { name: "Feb", Submissions: 30, Interviews: 15 },
  { name: "Mar", Submissions: 20, Interviews: 7 },
  { name: "Apr", Submissions: 35, Interviews: 12 }
];

const DashboardPanel = () => {
  const [view, setView] = useState("weekly");

  const data = view === "weekly" ? weeklyData : monthlyData;
  const totalSubmissions = data.reduce((acc, d) => acc + d.Submissions, 0);
  const totalInterviews = data.reduce((acc, d) => acc + d.Interviews, 0);
  const interviewRate = totalSubmissions ? ((totalInterviews / totalSubmissions) * 100).toFixed(1) : 0;
  const selectionRate = "45%"; // Placeholder

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>

      {/* Toggle Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => setView("weekly")}
          className={`px-4 py-2 rounded ${
            view === "weekly" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          Weekly
        </button>
        <button
          onClick={() => setView("monthly")}
          className={`px-4 py-2 rounded ${
            view === "monthly" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          Monthly
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-xl p-5 text-center">
          <p className="text-gray-500">Total Submissions</p>
          <p className="text-3xl font-semibold text-blue-700">{totalSubmissions}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-5 text-center">
          <p className="text-gray-500">Interview Rate</p>
          <p className="text-3xl font-semibold text-green-600">{interviewRate}%</p>
        </div>
        <div className="bg-white shadow rounded-xl p-5 text-center">
          <p className="text-gray-500">Selection Rate</p>
          <p className="text-3xl font-semibold text-purple-600">{selectionRate}</p>
        </div>
      </div>

      {/* Graph */}
      <div className="bg-white shadow rounded-xl p-5">
        <h3 className="text-lg font-medium text-gray-700 mb-4">
          Submissions vs Interviews ({view === "weekly" ? "Weekly" : "Monthly"})
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Submissions" stroke="#3b82f6" />
            <Line type="monotone" dataKey="Interviews" stroke="#10b981" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardPanel;
