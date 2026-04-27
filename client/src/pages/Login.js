import { useState } from "react";
import API from "../api/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful");
      window.location.href = "/bookings";
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "80px auto",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        textAlign: "center",
        backgroundColor: "#fff",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Login</h2>

      <input
        style={{
          margin: "10px 0",
          padding: "10px",
          width: "100%",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        style={{
          margin: "10px 0",
          padding: "10px",
          width: "100%",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type="button"
        style={{
          padding: "10px",
          width: "100%",
          marginTop: "15px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        onClick={handleSubmit}
      >
        Login
      </button>

      <p style={{ marginTop: "15px" }}>
        Don't have an account?{" "}
        <a href="/" style={{ color: "#007bff", textDecoration: "none" }}>
          Register
        </a>
      </p>
    </div>
  );
} 