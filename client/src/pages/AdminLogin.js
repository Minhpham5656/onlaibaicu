import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const validUser = username.trim() === "admin";
    const validPass = password.trim() === "123456";
    if (validUser && validPass) {
      navigate("/dashboard");
    } else {
      setError("Invalid credentials.");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Admin Login</h1>
        {error && <p className="notice">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Username
            <input
              className="input"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
          <label>
            Password
            <input
              className="input"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <div style={{ marginTop: "16px" }}>
            <button type="submit" className="button">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
