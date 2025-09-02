import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
<<<<<<< HEAD
    if (email === "doctor@raksha360.com" && password === "12345") {
      window.location.href = "/dashboard";
    } else {
      alert("Invalid login credentials 🚨");
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Doctor Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
=======
    alert(`Doctor login attempted for ${email}`);
    // Later: Connect to backend API
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Doctor Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: "block", margin: "10px 0", padding: "8px" }}
>>>>>>> dd2856b5340a04191d8992d0ff498edeea9e6a18
        />
        <input
          type="password"
          placeholder="Password"
<<<<<<< HEAD
          className="w-full border p-3 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
=======
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: "block", margin: "10px 0", padding: "8px" }}
        />
        <button type="submit" style={{ padding: "10px 20px", background: "#0077b6", color: "white" }}>
>>>>>>> dd2856b5340a04191d8992d0ff498edeea9e6a18
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
