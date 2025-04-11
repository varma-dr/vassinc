import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";

// Weekly vs Monthly data
const weeklyData = [
  { period: "Mon", submissions: 5 },
  { period: "Tue", submissions: 8 },
  { period: "Wed", submissions: 4 },
  { period: "Thu", submissions: 7 },
  { period: "Fri", submissions: 6 },
  { period: "Sat", submissions: 3 },
  { period: "Sun", submissions: 2 },
];

const monthlyData = [
  { period: "Week 1", submissions: 20 },
  { period: "Week 2", submissions: 25 },
  { period: "Week 3", submissions: 15 },
  { period: "Week 4", submissions: 30 },
];

// Pie chart for outcomes
const interviewStatus = [
  { name: "Selected", value: 12 },
  { name: "Rejected", value: 8 },
  { name: "Pending", value: 5 },
];
const COLORS = ["#4ade80", "#f87171", "#facc15"];

// Line chart: Submissions vs Interviews
const interviewTrend = [
  { period: "Week 1", submissions: 20, interviews: 10 },
  { period: "Week 2", submissions: 25, interviews: 15 },
  { period: "Week 3", submissions: 15, interviews: 8 },
  { period: "Week 4", submissions: 30, interviews: 18 },
];

export const DashboardPanel = () => {
  const [view, setView] = useState("weekly");

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Recruiter Analytics</h2>

      {/* 1. Submissions chart (Bar - toggle weekly/monthly) */}
      <div className="bg-white rounded-2xl shadow p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">Submissions ({view})</h3>
          <select
            value={view}
            onChange={(e) => setView(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={view === "weekly" ? weeklyData : monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="submissions" fill="#3b82f6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 2. Interview Outcomes (Pie Chart - unchanged) */}
      <div className="bg-white rounded-2xl shadow p-4">
        <h3 className="font-semibold mb-2">Interview Outcomes</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={interviewStatus}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {interviewStatus.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 3. Submissions vs Interviews Scheduled (Line Chart) */}
      <div className="bg-white rounded-2xl shadow p-4">
        <h3 className="font-semibold mb-2">Submissions vs Interviews Scheduled</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={interviewTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="submissions" stroke="#3b82f6" strokeWidth={2} />
            <Line type="monotone" dataKey="interviews" stroke="#10b981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
