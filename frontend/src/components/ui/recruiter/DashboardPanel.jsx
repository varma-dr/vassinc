import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  ResponsiveContainer,
} from "recharts";

const submissionsData = [
  { period: "Mon", submissions: 5 },
  { period: "Tue", submissions: 8 },
  { period: "Wed", submissions: 4 },
  { period: "Thu", submissions: 7 },
  { period: "Fri", submissions: 6 },
  { period: "Sat", submissions: 3 },
  { period: "Sun", submissions: 2 },
];

const interviewStatus = [
  { name: "Selected", value: 12 },
  { name: "Rejected", value: 8 },
  { name: "Pending", value: 5 },
];

const successTrend = [
  { week: "Week 1", successRate: 60 },
  { week: "Week 2", successRate: 70 },
  { week: "Week 3", successRate: 50 },
  { week: "Week 4", successRate: 75 },
];

const COLORS = ["#4ade80", "#f87171", "#facc15"];

export const DashboardPanel = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Recruiter Analytics Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Submissions Bar Chart */}
        <div className="bg-white rounded-2xl shadow p-4">
          <h3 className="font-semibold mb-2">Submissions This Week</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={submissionsData}>
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="submissions" fill="#60a5fa" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Interview Status Pie Chart */}
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

        {/* Interview Success Line Chart */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow p-4">
          <h3 className="font-semibold mb-2">Interview Success Rate</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={successTrend}>
              <XAxis dataKey="week" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="successRate"
                stroke="#10b981"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
