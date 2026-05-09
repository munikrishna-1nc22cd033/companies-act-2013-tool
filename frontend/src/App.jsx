import React, { useEffect, useState } from "react";

function App() {

    // LOGIN STATE
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // LOGIN INPUTS
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // RECORDS
    const [records, setRecords] = useState([]);

    // SEARCH
    const [search, setSearch] = useState("");

    // FETCH BACKEND DATA
    useEffect(() => {

        fetch("http://localhost:8080/records")
            .then((response) => response.json())
            .then((data) => setRecords(data))
            .catch((error) => console.error(error));

    }, []);

    // LOGIN FUNCTION
    const handleLogin = () => {

        if (email && password) {
            setIsLoggedIn(true);
        } else {
            alert("Enter Email and Password");
        }
    };

    // LOGOUT
    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    // SEARCH FILTER
    const filteredRecords = records.filter((record) =>
        record.companyName
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    // COUNTS
    const totalRecords = records.length;

    const pendingRecords = records.filter(
        (record) => record.status === "Pending"
    ).length;

    const completedRecords = records.filter(
        (record) => record.status === "Completed"
    ).length;

    // EXPORT CSV
    const exportCSV = () => {

        const headers = [
            "ID",
            "Company Name",
            "Compliance Type",
            "Status",
            "Due Date"
        ];

        const rows = records.map((record) => [
            record.id,
            record.companyName,
            record.complianceType,
            record.status,
            record.dueDate
        ]);

        let csvContent =
            headers.join(",") + "\n" +
            rows.map((e) => e.join(",")).join("\n");

        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;"
        });

        const link = document.createElement("a");

        link.href = URL.createObjectURL(blob);

        link.download = "compliance_records.csv";

        link.click();
    };

    // LOGIN PAGE
    if (!isLoggedIn) {

        return (

            <div
                style={{
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#EAF2FF"
                }}
            >

                <div
                    style={{
                        backgroundColor: "white",
                        padding: "40px",
                        borderRadius: "10px",
                        width: "350px",
                        boxShadow: "0px 0px 10px gray"
                    }}
                >

                    <h1 style={{ textAlign: "center" }}>
                        Login
                    </h1>

                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "20px"
                        }}
                    />

                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "20px"
                        }}
                    />

                    <button
                        onClick={handleLogin}
                        style={{
                            width: "100%",
                            padding: "12px",
                            marginTop: "20px",
                            backgroundColor: "#2563EB",
                            color: "white",
                            border: "none",
                            cursor: "pointer"
                        }}
                    >
                        Login
                    </button>

                </div>

            </div>
        );
    }

    // DASHBOARD PAGE

    return (

        <div
            style={{
                display: "flex",
                minHeight: "100vh",
                fontFamily: "Arial"
            }}
        >

            {/* SIDEBAR */}

            <div
                style={{
                    width: "220px",
                    backgroundColor: "#16213E",
                    color: "white",
                    padding: "20px"
                }}
            >

               <h2 style={{ marginBottom: "40px" }} > Dashboard </h2>

                <div style={{ marginTop: "20px", fontSize: "20px", cursor: "pointer" }} > Compliance Records </div>

                <div style={{ marginTop: "20px", fontSize: "20px", cursor: "pointer" }} > Users </div>

                <button
                    onClick={handleLogout}
                    style={{
                        marginTop: "30px",
                        padding: "10px",
                        width: "100%",
                        backgroundColor: "red",
                        color: "white",
                        border: "none",
                        cursor: "pointer"
                    }}
                >
                    Logout
                </button>

            </div>

            {/* MAIN CONTENT */}

            <div
                style={{
                    flex: 1,
                    backgroundColor: "#F3F4F6",
                    padding: "20px"
                }}
            >

               <h1 style={{ margin: 0, fontSize: "36px", letterSpacing: "1px" }} > Companies Act 2013 Compliance Tool </h1>
               <p style={{ marginTop: "10px", fontSize: "18px" }} > Welcome To Compliance Management Dashboard </p>

                {/* DASHBOARD CARDS */}

                <div
                    style={{
                        display: "flex",
                        gap: "20px",
                        marginTop: "20px",
                        flexWrap: "wrap"
                    }}
                >

                    <div
                        style={{
                            backgroundColor: "#28A745",
                            color: "white",
                            padding: "25px",
                            borderRadius: "10px",
                            width: "220px",
                            textAlign: "center"
                        }}
                    >
                        <h2>Total Records</h2>
                        <h1>{totalRecords}</h1>
                    </div>

                    <div
                        style={{
                            backgroundColor: "#FF9800",
                            color: "white",
                            padding: "20px",
                            borderRadius: "10px",
                            width: "220px",
                            textAlign: "center"
                        }}
                    >
                        <h2>Pending Records</h2>
                        <h1>{pendingRecords}</h1>
                    </div>

                    <div
                        style={{
                            backgroundColor: "#007BFF",
                            color: "white",
                            padding: "25px",
                            borderRadius: "10px",
                            width: "220px",
                            textAlign: "center"
                        }}
                    >
                        <h2>Completed Records</h2>
                        <h1>{completedRecords}</h1>
                    </div>

                    <div
                        style={{
                            backgroundColor: "#6F42C1",
                            color: "white",
                            padding: "20px",
                            borderRadius: "10px",
                            width: "220px",
                            textAlign: "center"
                        }}
                    >
                        <h2>Users</h2>
                        <h1>20</h1>
                    </div>

                </div>

                {/* TABLE */}

                <div
                    style={{
                        backgroundColor: "white",
                        marginTop: "30px",
                        padding: "20px",
                        borderRadius: "10px"
                    }}
                >

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "20px"
                        }}
                    >

                        {/* SEARCH */}

                        <input
                            type="text" placeholder="Search Company Name..." value={search} onChange={(e) => setSearch(e.target.value)
                            }
                            style={{
                               padding: "12px", width: "320px", borderRadius: "8px", border: "2px solid #007BFF", backgroundColor: "#EFF6FF", outline: "none", fontSize: "16px"
                            }}
                        />

                        {/* EXPORT CSV */}

                        <button
                            onClick={exportCSV}
                            style={{
                                padding: "10px 20px",
                                backgroundColor: "#007BFF",
                                color: "white",
                                border: "none",
                                cursor: "pointer"
                            }}
                        >
                            Export CSV
                        </button>

                    </div>

                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse"
                        }}
                    >

                        <thead>

                            <tr
                                style={{
                                    backgroundColor: "#E5E7EB"
                                }}
                            >

                                <th style={tableHeader}>ID</th>
                                <th style={tableHeader}>Company Name</th>
                                <th style={tableHeader}>Compliance Type</th>
                                <th style={tableHeader}>Status</th>
                                <th style={tableHeader}>Due Date</th>

                            </tr>

                        </thead>

                        <tbody>

                            {filteredRecords.map((record) => (

                                <tr
                                    key={record.id}
                                    style={{ textAlign: "center" }}
                                >

                                    <td style={tableCell}>
                                        {record.id}
                                    </td>

                                    <td style={tableCell}>
                                        {record.companyName}
                                    </td>

                                    <td style={tableCell}>
                                        {record.complianceType}
                                    </td>

                                    <td style={tableCell}>

                                        <span
                                            style={{
                                                backgroundColor:
                                                    record.status ===
                                                    "Pending"
                                                        ? "#FF9800"
                                                        : "#28A745",

                                                color: "white",
                                                padding: "5px 10px",
                                                borderRadius: "5px"
                                            }}
                                        >
                                            {record.status}
                                        </span>

                                    </td>

                                    <td style={tableCell}>
                                        {record.dueDate}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}

// TABLE HEADER STYLE

const tableHeader = {

    padding: "15px",
    borderBottom: "1px solid #D1D5DB",
    textAlign: "center"
};

// TABLE CELL STYLE

const tableCell = {

    padding: "15px",
    borderBottom: "1px solid #E5E7EB"
};

export default App;