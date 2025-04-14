// components/ui/candidate/PersonalInfoPanel.jsx
import React, { useState, useRef, useEffect } from "react";
import { Eye, EyeOff, Upload, Trash } from "lucide-react";

const countryCodes = ["+1", "+91"];
const visaOptions = ["F1-OPT", "H1B", "L2", "GC", "USC"];
const states = ["California", "Texas", "New York", "Florida", "Washington"];
const years = Array.from({ length: 31 }, (_, i) => 1995 + i);

const PersonalInfoPanel = ({ setUserInfo, setProfilePic }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+1",
    mobile: "",
    whatsapp: "",
    sameWhatsapp: true,
    visa: "",
    currentLocation: "",
    idProofLocation: "",
    preferredLocation: "",
    profilePic: null,
    documents: []
  });

  const [editing, setEditing] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [passwords, setPasswords] = useState({ old: "", new: "", confirm: "" });
  const [showPassToggle, setShowPassToggle] = useState({ old: false, new: false, confirm: false });
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef();

  useEffect(() => {
    if (form.sameWhatsapp) {
      setForm((prev) => ({ ...prev, whatsapp: prev.mobile }));
    }
  }, [form.mobile, form.sameWhatsapp]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedForm = {
      ...form,
      [name]: type === "checkbox" ? checked : value
    };
    if (name === "sameWhatsapp" && checked) updatedForm.whatsapp = form.mobile;
    if (name === "mobile" && form.sameWhatsapp) updatedForm.whatsapp = value;
    setForm(updatedForm);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prev) => ({ ...prev, profilePic: file }));
      setProfilePic(file);
    }
  };

  const handleDocUpload = (e) => {
    const files = Array.from(e.target.files);
    setForm((prev) => ({ ...prev, documents: [...prev.documents, ...files] }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const requiredFields = ["firstName", "lastName", "email", "mobile", "whatsapp", "currentLocation", "idProofLocation"];
    const newErrors = {};
    requiredFields.forEach((f) => {
      if (!form[f]) newErrors[f] = "This field is required";
    });
    if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email format";
    if (form.mobile.length !== 10) newErrors.mobile = "Enter 10-digit number";
    if (form.whatsapp.length !== 10) newErrors.whatsapp = "Enter 10-digit number";

    if (showPassword) {
      if (!passwords.old || !passwords.new || !passwords.confirm)
        newErrors.password = "All password fields are required";
      if (passwords.new !== passwords.confirm)
        newErrors.password = "Passwords do not match";
      if (!/[A-Z]/.test(passwords.new))
        newErrors.password = "Password must have at least one uppercase letter";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    setEditing(false);
    setUserInfo({ firstName: form.firstName, lastName: form.lastName });
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      countryCode: "+1",
      mobile: "",
      whatsapp: "",
      sameWhatsapp: true,
      visa: "",
      currentLocation: "",
      idProofLocation: "",
      preferredLocation: "",
      profilePic: null,
      documents: []
    });
    setPasswords({ old: "", new: "", confirm: "" });
    setErrors({});
    setEditing(true);
    setShowPassword(false);
  };

  const initials = `${form.firstName[0] || ""}${form.lastName[0] || ""}`.toUpperCase();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>

      <div className="bg-white shadow rounded-2xl p-6 space-y-4">
        {/* Profile Pic */}
        <div className="flex items-center gap-4">
          {form.profilePic ? (
            <img
              src={URL.createObjectURL(form.profilePic)}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-700 text-xl">
              {initials || "?"}
            </div>
          )}
          {editing && (
            <div className="space-x-2">
              <button onClick={() => fileInputRef.current.click()} className="text-sm text-blue-500 underline">
                Upload / Edit
              </button>
              {form.profilePic && (
                <button
                  onClick={() => setForm((prev) => ({ ...prev, profilePic: null }))}
                  className="text-sm text-red-500 underline"
                >
                  Delete
                </button>
              )}
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
            </div>
          )}
        </div>
                {/* Names & Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["firstName", "lastName", "email"].map((field) => (
            <div key={field}>
              <label className="block font-medium capitalize">{field} *</label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={form[field]}
                onChange={handleChange}
                disabled={!editing}
                className="w-full border rounded px-3 py-2"
              />
              {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
            </div>
          ))}

          {/* Mobile Number */}
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
                {countryCodes.map((code) => (
                  <option key={code}>{code}</option>
                ))}
              </select>
              <input
                name="mobile"
                maxLength="10"
                value={form.mobile}
                onChange={handleChange}
                disabled={!editing}
                className="flex-1 border rounded px-3 py-2"
              />
            </div>
            {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
          </div>

          {/* WhatsApp */}
          <div>
            <label className="block font-medium">WhatsApp Number *</label>
            <div className="flex gap-2">
              <select value={form.countryCode} className="border rounded px-2" disabled>
                <option>{form.countryCode}</option>
              </select>
              <input
                name="whatsapp"
                maxLength="10"
                value={form.whatsapp}
                onChange={handleChange}
                disabled={!editing || form.sameWhatsapp}
                className="flex-1 border rounded px-3 py-2"
              />
            </div>
            {editing && (
              <label className="block mt-1 text-sm">
                <input
                  type="checkbox"
                  name="sameWhatsapp"
                  checked={form.sameWhatsapp}
                  onChange={handleChange}
                />{" "}
                Same as Mobile
              </label>
            )}
            {errors.whatsapp && <p className="text-red-500 text-sm">{errors.whatsapp}</p>}
          </div>

          {/* Dropdowns */}
          {[
            { label: "Visa", name: "visa", options: visaOptions },
            { label: "Current Location", name: "currentLocation", options: states },
            { label: "ID Proof Location", name: "idProofLocation", options: states },
            { label: "Preferred Location", name: "preferredLocation", options: states }
          ].map(({ label, name, options }) => (
            <div key={name}>
              <label className="block font-medium">{label}{["currentLocation", "idProofLocation"].includes(name) ? " *" : ""}</label>
              <select
                name={name}
                value={form[name]}
                onChange={handleChange}
                disabled={!editing}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select</option>
                {options.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
              {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
            </div>
          ))}
        </div>

        {/* Document Upload */}
        <div>
          <label className="block font-medium">Documents (ID proof, passport, visa)</label>
          <input
            type="file"
            multiple
            accept=".pdf,.jpg,.png"
            onChange={handleDocUpload}
            disabled={!editing}
            className="w-full"
          />
          {form.documents.length > 0 && (
            <ul className="text-sm text-gray-600 mt-2 list-disc pl-5">
              {form.documents.map((doc, i) => (
                <li key={i}>{doc.name}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Change Password */}
        {editing && (
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-sm text-purple-600 underline"
            >
              {showPassword ? "Hide Password Fields" : "Change Password"}
            </button>

            {showPassword && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["old", "new", "confirm"].map((field) => (
                  <div key={field}>
                    <label className="block font-medium">
                      {field === "old" ? "Old Password" : field === "new" ? "New Password" : "Confirm Password"}
                    </label>
                    <div className="relative">
                      <input
                        type={showPassToggle[field] ? "text" : "password"}
                        name={field}
                        value={passwords[field]}
                        onChange={handlePasswordChange}
                        className="w-full border rounded px-3 py-2"
                      />
                      <span
                        onClick={() =>
                          setShowPassToggle((prev) => ({ ...prev, [field]: !prev[field] }))
                        }
                        className="absolute right-3 top-3 cursor-pointer"
                      >
                        {showPassToggle[field] ? <EyeOff size={16} /> : <Eye size={16} />}
                      </span>
                    </div>
                  </div>
                ))}
                {errors.password && (
                  <p className="text-red-500 text-sm col-span-full">{errors.password}</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="space-x-4 pt-4">
          {editing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </>
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
    </div>
  );
};

export default PersonalInfoPanel;


        
