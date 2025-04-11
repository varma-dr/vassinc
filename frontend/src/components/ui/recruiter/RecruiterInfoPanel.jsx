// components/ui/RecruiterInfoPanel.jsx
import React, { useState } from "react";

const initialData = {
  firstName: "",
  lastName: "",
  email: "",
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
  mobile: "",
  countryCode: "+1",
  whatsapp: "",
  sameWhatsapp: true,
  experience: "",
  company: "",
  degree: "",
  university: "",
  passedOut: "",
  profilePic: null,
};

const countryCodes = ["+1", "+91"];
const degrees = ["Bachelor's", "Master's", "Ph.D"];
const years = Array.from({ length: 31 }, (_, i) => 1995 + i);

export const RecruiterInfoPanel = ({ setProfilePic, setUserInfo }) => {
  const [form, setForm] = useState(initialData);
  const [editing, setEditing] = useState(true);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "sameWhatsapp") {
      const updatedForm = {
        ...form,
        sameWhatsapp: checked,
        whatsapp: checked ? form.mobile : "",
      };
      setForm(updatedForm);
    } else {
      const updatedForm = {
        ...form,
        [name]: value,
      };
      if (form.sameWhatsapp && name === "mobile") {
        updatedForm.whatsapp = value;
      }
      setForm(updatedForm);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setForm({ ...form, profilePic: file });
  };

  const handleSave = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "mobile",
      "whatsapp",
      "experience",
      "company",
      "degree",
      "university",
      "passedOut",
    ];
    for (const field of requiredFields) {
      if (!form[field]) {
        alert("All fields except photo and password are required.");
        return;
      }
    }
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
      alert("Please enter a valid email.");
      return;
    }
    if (form.mobile.length !== 10 || form.whatsapp.length !== 10) {
      alert("Mobile and WhatsApp numbers must be 10 digits.");
      return;
    }

    setUserInfo({
      firstName: form.firstName,
      lastName: form.lastName,
    });
    if (form.profilePic) {
      setProfilePic(form.profilePic);
    }

    setEditing(false);
    alert("Recruiter information saved.");
  };

  const handleCancel = () => {
    setForm(initialData);
    setEditing(true);
  };

  const initials = `${form.firstName[0] || ""}${form.lastName[0] || ""}`.toUpperCase();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Recruiter Information</h2>

      <div className="bg-white shadow rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-4">
          {form.profilePic ? (
            <img
              src={URL.createObjectURL(form.profilePic)}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-xl font-bold text-blue-700">
              {initials || "?"}
            </div>
          )}
          {editing && (
            <div className="space-x-2">
              <input type="file" onChange={handleFileChange} />
              <button
                onClick={() => setForm({ ...form, profilePic: null })}
                className="text-sm text-red-500 underline"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["firstName", "lastName", "email", "oldPassword", "newPassword", "confirmPassword"].map((field) => (
            <div key={field}>
              <label className="block font-medium">
                {field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
              </label>
              <input
                type={field.toLowerCase().includes("password") ? "password" : field === "email" ? "email" : "text"}
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                disabled={!editing}
              />
            </div>
          ))}

          <div>
            <label className="block font-medium">Mobile Number *</label>
            <div className="flex gap-2">
              <select
                name="countryCode"
                value={form.countryCode}
                onChange={handleChange}
                className="border rounded px-2"
                disabled={!editing}
              >
                {countryCodes.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <input
                name="mobile"
                maxLength="10"
                pattern="\d*"
                value={form.mobile}
                onChange={handleChange}
                className="flex-1 border rounded px-3 py-2"
                disabled={!editing}
              />
            </div>
          </div>

          <div>
            <label className="block font-medium">WhatsApp Number *</label>
            <div className="flex gap-2">
              <select
                value={form.countryCode}
                className="border rounded px-2"
                disabled
              >
                <option>{form.countryCode}</option>
              </select>
              <input
                name="whatsapp"
                maxLength="10"
                pattern="\d*"
                value={form.whatsapp}
                onChange={handleChange}
                className="flex-1 border rounded px-3 py-2"
                disabled={!editing || form.sameWhatsapp}
              />
            </div>
            {editing && (
              <label className="block text-sm mt-1">
                <input
                  type="checkbox"
                  name="sameWhatsapp"
                  checked={form.sameWhatsapp}
                  onChange={handleChange}
                />{" "}
                Same as Mobile
              </label>
            )}
          </div>

          {["experience", "company"].map((field) => (
            <div key={field}>
              <label className="block font-medium">
                {field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())} *
              </label>
              <input
                name={field}
                type={field === "experience" ? "number" : "text"}
                min={field === "experience" ? 0 : undefined}
                max={field === "experience" ? 30 : undefined}
                value={form[field]}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                disabled={!editing}
              />
            </div>
          ))}

          <div>
            <label className="block font-medium">Highest Degree *</label>
            <select
              name="degree"
              value={form.degree}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              disabled={!editing}
            >
              <option value="">Select Degree</option>
              {degrees.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium">University Name *</label>
            <input
              name="university"
              value={form.university}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              disabled={!editing}
            />
          </div>

          <div>
            <label className="block font-medium">Passed Out Year *</label>
            <select
              name="passedOut"
              value={form.passedOut}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              disabled={!editing}
            >
              <option value="">Select Year</option>
              {years.map((y) => (
                <option key={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        {editing ? (
          <div className="space-x-4">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};
