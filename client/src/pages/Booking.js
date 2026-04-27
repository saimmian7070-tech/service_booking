import { useEffect, useState } from "react";
import API from "../api/api";

export default function Booking() {
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    API.get("/bookings")
      .then((res) => setBookings(res.data))
      .catch(() => alert("Error fetching bookings"));
  }, []);

  const handleBooking = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await API.post("/bookings", {
        userId: user?._id,
        service,
        date,
        time,
      });

      alert("Booking created!");
      setBookings((prev) => [...prev, res.data]);

      setService("");
      setDate("");
      setTime("");
    } catch {
      alert("Something went wrong!");
    }
  };

  return (
    <div style={{ padding: "30px", backgroundColor: "#f5f6fa", minHeight: "100vh" }}>
      
      {/* Logout top-right */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#dc3545",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>

      <div style={{ display: "flex", gap: "30px", justifyContent: "center" }}>
        
        {/* LEFT - CREATE BOOKING */}
        <div
          style={{
            width: "300px",
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)"
          }}
        >
          <h3 style={{ marginBottom: "15px" }}>Create Booking</h3>

          <input
            style={inputStyle}
            placeholder="Service"
            value={service}
            onChange={(e) => setService(e.target.value)}
          />

          <input
            style={inputStyle}
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <input
            style={inputStyle}
            placeholder="Time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          <button
            style={primaryBtn}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
            onClick={handleBooking}
          >
            Book
          </button>
        </div>

        {/* RIGHT - BOOKINGS LIST */}
        <div
          style={{
            width: "400px",
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)"
          }}
        >
          <h3 style={{ marginBottom: "15px" }}>All Bookings</h3>

          {bookings.length === 0 ? (
            <p>No bookings yet</p>
          ) : (
            bookings.map((b) => (
              <div
                key={b._id}
                style={{
                  borderLeft: "5px solid #007bff",
                  padding: "10px",
                  marginBottom: "10px",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "5px"
                }}
              >
                <p style={{ margin: 0, fontWeight: "bold" }}>{b.service}</p>
                <p style={{ margin: 0 }}>{b.date}</p>
                <p style={{ margin: 0 }}>{b.time}</p>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

// styles
const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc"
};

const primaryBtn = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};