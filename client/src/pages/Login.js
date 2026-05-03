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

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ddd",
    outline: "none",
    fontSize: "14px",
    transition: "0.2s",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    background: "linear-gradient(135deg, #007bff, #0056d2)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600",
    transition: "0.2s",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #eef2f3, #8e9eab)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "380px",
          padding: "35px",
          borderRadius: "14px",
          backgroundColor: "#fff",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "5px", color: "#333" }}>Welcome Back</h2>
        <p style={{ marginBottom: "20px", color: "#777", fontSize: "13px" }}>
          Login to continue
        </p>

        <form onSubmit={handleSubmit}>
          <input
            style={inputStyle}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={(e) => (e.target.style.border = "1px solid #007bff")}
            onBlur={(e) => (e.target.style.border = "1px solid #ddd")}
          />

          <input
            style={inputStyle}
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={(e) => (e.target.style.border = "1px solid #007bff")}
            onBlur={(e) => (e.target.style.border = "1px solid #ddd")}
          />

          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) =>
              (e.target.style.transform = "translateY(-2px)")
            }
            onMouseOut={(e) =>
              (e.target.style.transform = "translateY(0px)")
            }
          >
            Login
          </button>
        </form>

        <p style={{ marginTop: "18px", fontSize: "13px", color: "#555" }}>
          Don't have an account?{" "}
          <a
            href="/"
            style={{
              color: "#007bff",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}