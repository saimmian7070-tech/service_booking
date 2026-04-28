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
      <h2 style={{ marginBottom: "20px" }}>Register</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          style={{
            margin: "10px 0",
            padding: "10px",
            width: "100%",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          name="email"
          type="email"
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
          name="password"
          type="password"
          style={{
            margin: "10px 0",
            padding: "10px",
            width: "100%",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
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
        >
          Register
        </button>
      </form>

      <p style={{ marginTop: "15px" }}>
        Already have an account?{" "}
        <a href="/login" style={{ color: "#007bff", textDecoration: "none" }}>
          Login
        </a>
      </p>
    </div>
  );
}