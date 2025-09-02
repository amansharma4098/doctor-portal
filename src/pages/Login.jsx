import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Temporary hardcoded login (replace with backend auth later)
    if (email === "doctor@raksha360.com" && password === "12345") {
      localStorage.setItem("doctor", email);
      window.location.href = "/dashboard";
    } else {
      alert("❌ Invalid login credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh] bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Doctor Login 🩺
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-4 focus:ring focus:ring-blue-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-4 focus:ring focus:ring-blue-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
