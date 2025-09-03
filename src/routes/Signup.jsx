import React, { useState } from "react";
import API_BASE_URL from "../config";

function Signup() {
  const [form, setForm] = useState({
    name: "", email: "", password: "", specialization: "", city: "", degree: "", contact: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch(`${API_BASE_URL}/auth/doctor/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Signup successful! Redirecting to login...");
        setTimeout(() => { window.location.href = "/login"; }, 1500);
      } else {
        setMessage(`❌ Error: ${data.detail || "Signup failed"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-[90vh] bg-gray-100">
      <form onSubmit={handleSignup} className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Doctor Signup</h2>
        <input type="text" name="name" placeholder="Full Name" value={form.name}
          onChange={handleChange} className="w-full border p-3 rounded mb-3" required />
        <input type="email" name="email" placeholder="Email" value={form.email}
          onChange={handleChange} className="w-full border p-3 rounded mb-3" required />
        <input type="password" name="password" placeholder="Password" value={form.password}
          onChange={handleChange} className="w-full border p-3 rounded mb-3" required />
        <input type="text" name="specialization" placeholder="Specialization" value={form.specialization}
          onChange={handleChange} className="w-full border p-3 rounded mb-3" required />
        <input type="text" name="degree" placeholder="Degree" value={form.degree}
          onChange={handleChange} className="w-full border p-3 rounded mb-3" required />
        <input type="text" name="city" placeholder="City" value={form.city}
          onChange={handleChange} className="w-full border p-3 rounded mb-3" required />
        <input type="text" name="contact" placeholder="Contact No." value={form.contact}
          onChange={handleChange} className="w-full border p-3 rounded mb-3" required />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Signup</button>
        {message && <p className="mt-3 text-center text-sm">{message}</p>}
      </form>
    </div>
  );
}

export default Signup;