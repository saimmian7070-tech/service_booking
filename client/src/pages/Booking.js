import { useEffect, useState } from "react";
import API from "../api/api";

export default function Booking() {
  const [form, setForm] = useState({
    service: "",
    date: "",
    time: "",
  });

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setError("");
        const res = await API.get("/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
      } catch (err) {
        setError("Failed to load bookings.");
      }
    };

    fetchBookings();
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBooking = async () => {
    if (!form.service || !form.date || !form.time) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await API.post("/bookings", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBookings((prev) => [...prev, res.data]);
      setForm({ service: "", date: "", time: "" });
    } catch (err) {
      setError("Booking failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div style={styles.page}>
      
      <header style={styles.header}>
        <h2 style={styles.title}>Booking Dashboard</h2>
        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </header>

      {error && <div style={styles.error}>{error}</div>}

      <div style={styles.container}>

        {/* FORM CARD */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Create New Booking</h3>

          <input
            name="service"
            value={form.service}
            onChange={handleChange}
            placeholder="Service"
            style={styles.input}
          />

          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="time"
            value={form.time}
            onChange={handleChange}
            placeholder="Time (e.g. 10:30 AM)"
            style={styles.input}
          />

          <button
            onClick={handleBooking}
            style={{
              ...styles.primaryBtn,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            disabled={loading}
          >
            {loading ? "Booking..." : "Book Appointment"}
          </button>
        </div>

        {/* BOOKINGS LIST */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Your Bookings</h3>

          {bookings.length === 0 ? (
            <p style={{ color: "#777" }}>No bookings found</p>
          ) : (
            bookings.map((b) => (
              <div key={b._id} style={styles.bookingItem}>
                <div style={{ fontWeight: "600" }}>{b.service}</div>
                <div style={styles.meta}>{b.date} • {b.time}</div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

/* STYLES */
const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f6f9",
    padding: "30px",
    fontFamily: "Arial, sans-serif",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },

  title: {
    margin: 0,
    color: "#222",
  },

  logoutBtn: {
    padding: "10px 18px",
    background: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  container: {
    display: "flex",
    gap: "25px",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  card: {
    width: "340px",
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  },

  cardTitle: {
    marginBottom: "15px",
    color: "#333",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    outline: "none",
  },

  primaryBtn: {
    width: "100%",
    padding: "12px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
  },

  bookingItem: {
    padding: "10px",
    borderLeft: "4px solid #007bff",
    background: "#f9f9f9",
    marginBottom: "10px",
    borderRadius: "6px",
  },

  meta: {
    fontSize: "13px",
    color: "#666",
  },

  error: {
    background: "#ffe5e5",
    color: "#c0392b",
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "15px",
  },
};