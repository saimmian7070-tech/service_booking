import { useState } from "react";
import API from "../api/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Registered Successfully!");
      window.location.href = "/login";
    } catch (err) {
      console.log(err);
      alert("Registration failed");
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
        <h2 style={{ marginBottom: "5px", color: "#333" }}>Create Account</h2>
        <p style={{ marginBottom: "20px", color: "#777", fontSize: "13px" }}>
          Sign up to get started
        </p>

        <form onSubmit={handleSubmit}>
          <input
            style={inputStyle}
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={(e) => (e.target.style.border = "1px solid #007bff")}
            onBlur={(e) => (e.target.style.border = "1px solid #ddd")}
          />

          <input
            style={inputStyle}
            placeholder="Email"
            type="email"
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
            Register
          </button>
        </form>

        <p style={{ marginTop: "18px", fontSize: "13px", color: "#555" }}>
          Already have an account?{" "}
          <a
            href="/login"
            style={{
              color: "#007bff",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}