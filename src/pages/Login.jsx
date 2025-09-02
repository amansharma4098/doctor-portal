import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
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
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: "block", margin: "10px 0", padding: "8px" }}
        />
        <button type="submit" style={{ padding: "10px 20px", background: "#0077b6", color: "white" }}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
