import React, { useState } from "react";
import API_BASE_URL from "../config";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    degree: "",
    city: "",
    contact: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage(""); // reset message
    try {
      const res = await fetch(`${API_BASE_URL}/auth/doctor/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data?.doctor_id) {
        setMessage("✅ Signup successful! Redirecting to login...");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } else {
        setMessage(`❌ Error: ${data.detail || "Signup failed"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-white p-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg border">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Doctor Signup
        </h2>
        <form onSubmit={handleSignup}>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            <input
              type="text"
              name="specialization"
              placeholder="Specialization (e.g., Cardiologist)"
              value={form.specialization}
              onChange={handleChange}
              className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            <input
              type="text"
              name="degree"
              placeholder="Degree"
              value={form.degree}
              onChange={handleChange}
              className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
            <input
              type="text"
              name="contact"
              placeholder="Contact No."
              value={form.contact}
              onChange={handleChange}
              className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-200"
          >
            Signup
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message.startsWith("✅") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Signup;
