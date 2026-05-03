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
      } catch {
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

      setBookings((prev) => [res.data, ...prev]);
      setForm({ service: "", date: "", time: "" });
    } catch {
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
      <div style={styles.topBar}>
        <div>
          <h2 style={styles.title}>Bookings</h2>
          <p style={styles.subTitle}>Manage your appointments easily</p>
        </div>

        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>

      {error && <div style={styles.error}>{error}</div>}

      <div style={styles.grid}>
        {/* LEFT - FORM */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>New Booking</h3>

          <input
            name="service"
            value={form.service}
            onChange={handleChange}
            placeholder="Service (e.g. Haircut)"
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
            disabled={loading}
            style={{
              ...styles.primaryBtn,
              opacity: loading ? 0.7 : 1,
              transform: loading ? "scale(0.98)" : "scale(1)",
            }}
          >
            {loading ? "Creating..." : "Create Booking"}
          </button>
        </div>

        {/* RIGHT - LIST */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Your Schedule</h3>

          {bookings.length === 0 ? (
            <p style={styles.empty}>No bookings yet</p>
          ) : (
            bookings.map((b) => (
              <div key={b._id} style={styles.bookingCard}>
                <div style={styles.bookingTop}>
                  <span style={styles.service}>{b.service}</span>
                  <span style={styles.badge}>Confirmed</span>
                </div>

                <div style={styles.meta}>
                  📅 {b.date} • ⏰ {b.time}
                </div>
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
    padding: "30px",
    fontFamily: "Arial, sans-serif",
    background: "linear-gradient(135deg, #eef2f3, #d9e4f5)",
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },

  title: {
    margin: 0,
    fontSize: "26px",
    color: "#222",
  },

  subTitle: {
    margin: 0,
    fontSize: "13px",
    color: "#666",
  },

  logoutBtn: {
    padding: "10px 16px",
    background: "#ff4d4d",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },

  grid: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  card: {
    width: "360px",
    background: "#fff",
    padding: "22px",
    borderRadius: "16px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
  },

  cardTitle: {
    marginBottom: "15px",
    color: "#333",
  },

  input: {
    width: "100%",
    padding: "12px 14px",
    marginBottom: "10px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    outline: "none",
    transition: "0.2s",
  },

  primaryBtn: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    background: "linear-gradient(135deg, #007bff, #0056d2)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "0.2s",
  },

  bookingCard: {
    padding: "12px",
    borderRadius: "12px",
    background: "#f8f9ff",
    marginBottom: "10px",
    border: "1px solid #eef",
  },

  bookingTop: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "5px",
  },

  service: {
    fontWeight: "600",
    color: "#222",
  },

  badge: {
    fontSize: "11px",
    background: "#dff6e3",
    color: "#1e7d34",
    padding: "3px 8px",
    borderRadius: "8px",
  },

  meta: {
    fontSize: "13px",
    color: "#666",
  },

  empty: {
    color: "#888",
    fontSize: "14px",
  },

  error: {
    background: "#ffe5e5",
    color: "#c0392b",
    padding: "10px",
    borderRadius: "10px",
    marginBottom: "15px",
  },
};