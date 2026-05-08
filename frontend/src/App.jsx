import React, { useEffect, useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [records, setRecords] = useState([]);

  // Fake login
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  // Fetch backend data
  useEffect(() => {
    if (isLoggedIn) {
      fetch("http://localhost:8080/records")
        .then((res) => res.json())
        .then((data) => setRecords(data))
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  // LOGIN PAGE UI
  if (!isLoggedIn) {
    return (
      <div style={styles.loginPage}>
        <form onSubmit={handleLogin} style={styles.loginBox}>
          <h2>Login</h2>

          <input type="email" placeholder="Email" required style={styles.input} />
          <input type="password" placeholder="Password" required style={styles.input} />

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
      </div>
    );
  }

  // DASHBOARD UI
  return (
    <div style={styles.dashboard}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h3>Dashboard</h3>
        <p>Compliance Records</p>
        <p>Users</p>
        <button style={styles.logoutBtn} onClick={() => setIsLoggedIn(false)}>
          Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div style={styles.main}>
        <h2>Welcome, Admin!</h2>

        {/* CARDS */}
        <div style={styles.cards}>
          <div style={{ ...styles.card, background: "#28a745" }}>
            Total Records <h3>{records.length}</h3>
          </div>

          <div style={{ ...styles.card, background: "#ff9800" }}>
            Pending <h3>{records.filter(r => r.status === "Pending").length}</h3>
          </div>

          <div style={{ ...styles.card, background: "#007bff" }}>
            Completed <h3>{records.filter(r => r.status === "Completed").length}</h3>
          </div>

          <div style={{ ...styles.card, background: "#6f42c1" }}>
            Users <h3>20</h3>
          </div>
        </div>

        {/* TABLE */}
        <div style={styles.tableBox}>
          <div style={styles.tableHeader}>
            <input placeholder="Search..." style={styles.search} />
            <button style={styles.exportBtn}>Export CSV</button>
          </div>

          <table style={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Company Name</th>
                <th>Status</th>
                <th>Due Date</th>
              </tr>
            </thead>

            <tbody>
              {records.map((r, index) => (
                <tr key={index}>
                  <td>{r.id}</td>
                  <td>{r.companyName}</td>
                  <td>
                    <span
                      style={{
                        padding: "5px 10px",
                        borderRadius: "5px",
                        color: "white",
                        background: r.status === "Completed" ? "green" : "orange",
                      }}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td>{r.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// SIMPLE CSS STYLES
const styles = {
  loginPage: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#dbeafe",
  },

  loginBox: {
    display: "flex",
    flexDirection: "column",
    padding: "30px",
    background: "white",
    borderRadius: "10px",
    width: "300px",
    gap: "10px",
  },

  input: {
    padding: "10px",
    border: "1px solid gray",
    borderRadius: "5px",
  },

  button: {
    padding: "10px",
    background: "#2563eb",
    color: "white",
    border: "none",
    cursor: "pointer",
  },

  dashboard: {
    display: "flex",
    height: "100vh",
  },

  sidebar: {
    width: "200px",
    background: "#1e293b",
    color: "white",
    padding: "20px",
  },

  logoutBtn: {
    marginTop: "20px",
    padding: "10px",
    background: "red",
    color: "white",
    border: "none",
    cursor: "pointer",
  },

  main: {
    flex: 1,
    padding: "20px",
    background: "#f1f5f9",
  },

  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "10px",
    marginBottom: "20px",
  },

  card: {
    padding: "20px",
    color: "white",
    borderRadius: "10px",
    textAlign: "center",
  },

  tableBox: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
  },

  tableHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },

  search: {
    padding: "8px",
    width: "200px",
  },

  exportBtn: {
    padding: "8px",
    background: "#2563eb",
    color: "white",
    border: "none",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
};

export default App;