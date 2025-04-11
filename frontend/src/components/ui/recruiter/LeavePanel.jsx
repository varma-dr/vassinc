import React, { useState } from "react";

export const LeavePanel = () => {
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    reason: "",
    attachment: null,
  });
  const [status, setStatus] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
      ...(name === "fromDate" && {
        toDate: value > prev.toDate ? value : prev.toDate,
      }),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { reason, fromDate, toDate } = formData;

    if (!reason || !fromDate || !toDate) {
      setStatus("");
      setSubmitted(false);
      alert("Reason and date fields are mandatory.");
      return;
    }

    // Simulate approval logic
    setStatus("Pending");
    setSubmitted(true);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Apply for Leave</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-2xl p-6 space-y-4"
      >
        <div className="space-y-2">
          <label className="block font-medium">Reason for Leave *</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            rows={3}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block font-medium">From Date *</label>
            <input
              type="date"
              name="fromDate"
              value={formData.fromDate}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
              min={today}
            />
          </div>

          <div className="flex-1">
            <label className="block font-medium">To Date *</label>
            <input
              type="date"
              name="toDate"
              value={formData.toDate}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
              min={formData.fromDate || today}
            />
          </div>
        </div>

        <div>
          <label className="block font-medium">Attachment (optional)</label>
          <input
            type="file"
            name="attachment"
            accept=".pdf,.jpg,.png"
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Leave Request
        </button>

        {submitted && (
          <p className="text-green-600 font-medium mt-2">Leave request submitted successfully!</p>
        )}
      </form>

      {status && (
        <div className="text-sm text-gray-700">
          <span className="font-semibold">Leave Status:</span>{" "}
          <span
            className={`$ {
              status === "Approved"
                ? "text-green-600"
                : status === "Rejected"
                ? "text-red-600"
                : "text-yellow-600"
            } font-medium`}
          >
            {status}
          </span>
        </div>
      )}
    </div>
  );
};
