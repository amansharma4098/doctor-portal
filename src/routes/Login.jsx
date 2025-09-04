import React, { useState } from "react";
import API_BASE_URL from "../config";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/auth/doctor/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("doctorToken", data.token);
        localStorage.setItem("doctorName", data.name);
        localStorage.setItem("doctorId", data.doctor_id);
        window.location.href = "/dashboard";
      } else {
        alert("❌ Invalid credentials");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-100 p-6 gap-8">

      {/* Welcome Section */}
      <div className="md:w-1/2 bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center mb-8 md:mb-0">
        <h1 className="text-5xl font-extrabold text-blue-700 mb-6 select-none">Raksha360</h1>
        <h2 className="text-3xl font-bold mb-2 text-blue-700">Welcome Doctor!</h2>
        <p className="text-gray-600 max-w-sm">
          Login securely to manage your appointments and patients efficiently.
        </p>
      </div>

      {/* Login Form Section */}
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl mb-6 font-bold text-gray-800 text-center">Doctor Login</h2>

        <label htmlFor="email" className="block text-gray-700 mb-1 font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          className="border border-gray-300 p-3 w-full rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password" className="block text-gray-700 mb-1 font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          className="border border-gray-300 p-3 w-full rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-3 w-full rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
