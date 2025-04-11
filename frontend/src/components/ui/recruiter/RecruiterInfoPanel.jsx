// components/ui/RecruiterInfoPanel.jsx
import React, { useState, useRef, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

const initialData = {
  firstName: "",
  lastName: "",
  email: "",
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
const degrees = ["High School", "Diploma", "Associate's", "Bachelor's", "Master's", "Ph.D"];
const years = Array.from({ length: 31 }, (_, i) => 1995 + i);

export const RecruiterInfoPanel = ({ setProfilePic, setUserInfo }) => {
  const [form, setForm] = useState(initialData);
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [resetPassword, setResetPassword] = useState(false); // New state to track if we're resetting password
  const [passwords, setPasswords] = useState({ old: "", new: "", confirm: "" });
  const [showPass, setShowPass] = useState({ old: false, new: false, confirm: false });
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (form.sameWhatsapp) setForm((prev) => ({ ...prev, whatsapp: prev.mobile }));
  }, [form.mobile, form.sameWhatsapp]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "experience" && (isNaN(value) || value < 0 || value > 30)) return;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "sameWhatsapp" && checked ? { whatsapp: prev.mobile } : {})
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const fields = ["firstName", "lastName", "email", "mobile", "whatsapp", "experience", "degree", "passedOut"];
    const errs = {};
    fields.forEach((field) => {
      if (!form[field]) errs[field] = "This field is mandatory";
    });
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email format";
    if (form.mobile.length !== 10) errs.mobile = "Must be 10 digits";
    if (form.whatsapp.length !== 10) errs.whatsapp = "Must be 10 digits";
    
    // Only validate password fields if we're actually resetting password
    if (resetPassword) {
      ["old", "new", "confirm"].forEach((key) => {
        if (!passwords[key]) errs[key] = "This field is mandatory";
      });
      if (passwords.new !== passwords.confirm) errs.confirm = "Passwords do not match";
      if (passwords.new && !/[A-Z]/.test(passwords.new)) errs.new = "Password must contain at least one uppercase letter";
    }
    
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, profilePic: file }));
    if (file) setProfilePic(file);
  };

  const handleSave = () => {
    if (!validate()) return;
    setUserInfo({ firstName: form.firstName, lastName: form.lastName });
    
    // Handle password reset separately if needed
    if (resetPassword) {
      // Here you would call API to reset password
      alert("Information and password saved successfully.");
    } else {
      alert("Information saved successfully.");
    }
    
    setEditing(false);
    setResetPassword(false);
    setShowPasswordFields(false);
  };

  const handleCancel = () => {
    setForm(initialData);
    setPasswords({ old: "", new: "", confirm: "" });
    setErrors({});
    setEditing(false);
    setShowPasswordFields(false);
    setResetPassword(false);
  };

  const handleResetPassword = () => {
    setEditing(true);
    setShowPasswordFields(true);
    setResetPassword(true);
  };

  const initials = `${form.firstName[0] || ""}${form.lastName[0] || ""}`.toUpperCase();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Recruiter Information</h2>
      <div className="bg-white shadow rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-4">
          {form.profilePic ? (
            <img src={URL.createObjectURL(form.profilePic)} alt="Profile" className="w-16 h-16 rounded-full object-cover" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-xl font-bold text-blue-700">
              {initials || "?"}
            </div>
          )}
          {editing && (
            <div className="space-x-2">
              <button onClick={() => fileInputRef.current.click()} className="text-sm text-blue-500 underline">Upload / Edit Photo</button>
              {form.profilePic && (
                <button onClick={() => setForm((prev) => ({ ...prev, profilePic: null }))} className="text-sm text-red-500 underline">Delete</button>
              )}
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["firstName", "lastName", "email"].map((field) => (
            <div key={field}>
              <label className="block font-medium">{field.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())} *</label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={form[field]}
                onChange={handleChange}
                disabled={!editing}
                className="w-full border rounded px-3 py-2"
              />
              {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
            </div>
          ))}

          <div>
            <label className="block font-medium">Mobile Number *</label>
            <div className="flex gap-2">
              <select name="countryCode" value={form.countryCode} onChange={handleChange} className="border rounded px-2" disabled={!editing}>
                {countryCodes.map((c) => (<option key={c}>{c}</option>))}
              </select>
              <input name="mobile" maxLength="10" value={form.mobile} onChange={handleChange} className="flex-1 border rounded px-3 py-2" disabled={!editing} />
            </div>
            {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
          </div>

          <div>
            <label className="block font-medium">WhatsApp Number *</label>
            <div className="flex gap-2">
              <select value={form.countryCode} className="border rounded px-2" disabled>
                <option>{form.countryCode}</option>
              </select>
              <input name="whatsapp" maxLength="10" value={form.whatsapp} onChange={handleChange} className="flex-1 border rounded px-3 py-2" disabled={!editing || form.sameWhatsapp} />
            </div>
            {editing && (
              <label className="block text-sm mt-1">
                <input type="checkbox" name="sameWhatsapp" checked={form.sameWhatsapp} onChange={handleChange} /> Same as Mobile
              </label>
            )}
            {errors.whatsapp && <p className="text-red-500 text-sm mt-1">{errors.whatsapp}</p>}
          </div>

          <div>
            <label className="block font-medium">Experience (0–30 years) *</label>
            <input
              name="experience"
              type="number"
              min="0"
              max="30"
              value={form.experience}
              onChange={handleChange}
              disabled={!editing}
              className="w-full border rounded px-3 py-2"
            />
            {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
          </div>

          <div>
            <label className="block font-medium">Company</label>
            <input name="company" value={form.company} onChange={handleChange} className="w-full border rounded px-3 py-2" disabled={!editing} />
          </div>

          <div>
            <label className="block font-medium">Highest Degree *</label>
            <select name="degree" value={form.degree} onChange={handleChange} className="w-full border rounded px-3 py-2" disabled={!editing}>
              <option value="">Select Degree</option>
              {degrees.map((d) => (<option key={d}>{d}</option>))}
            </select>
            {errors.degree && <p className="text-red-500 text-sm mt-1">{errors.degree}</p>}
          </div>

          <div>
            <label className="block font-medium">University Name</label>
            <input name="university" value={form.university} onChange={handleChange} className="w-full border rounded px-3 py-2" disabled={!editing} />
          </div>

          <div>
            <label className="block font-medium">Passed Out Year *</label>
            <select name="passedOut" value={form.passedOut} onChange={handleChange} className="w-full border rounded px-3 py-2" disabled={!editing}>
              <option value="">Select Year</option>
              {years.map((y) => (<option key={y}>{y}</option>))}
            </select>
            {errors.passedOut && <p className="text-red-500 text-sm mt-1">{errors.passedOut}</p>}
          </div>
        </div>

        {showPasswordFields && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <h3 className="col-span-2 font-semibold text-lg">Reset Password</h3>
            {Object.entries(passwords).map(([key, value]) => (
              <div key={key}>
                <label className="block font-medium">{key === "old" ? "Old Password" : key === "new" ? "New Password" : "Confirm Password"} *</label>
                <div className="relative">
                  <input
                    type={showPass[key] ? "text" : "password"}
                    name={key}
                    value={value}
                    onChange={handlePasswordChange}
                    className="w-full border rounded px-3 py-2"
                  />
                  <span onClick={() => setShowPass((prev) => ({ ...prev, [key]: !prev[key] }))} className="absolute right-3 top-3 cursor-pointer">
                    {showPass[key] ? <EyeOff size={16} /> : <Eye size={16} />}
                  </span>
                </div>
                {errors[key] && <p className="text-red-500 text-sm mt-1">{errors[key]}</p>}
              </div>
            ))}
          </div>
        )}

        <div className="space-x-4 mt-4">
          {editing ? (
            <>
              <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save</button>
              <button onClick={handleCancel} className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">Cancel</button>
              {!showPasswordFields && (
                <button onClick={() => setShowPasswordFields(true)} className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">Reset Password</button>
              )}
            </>
          ) : (
            <>
              <button onClick={() => { setEditing(true); }} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Edit</button>
              <button onClick={handleResetPassword} className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">Reset Password</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};