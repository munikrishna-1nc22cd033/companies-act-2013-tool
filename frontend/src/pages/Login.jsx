import React, { useState } from "react";

function Login({ onLogin }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        // simple demo login
        if (email === "abc@gmail.com" && password === "123") {
            onLogin(true);
        } else {
            alert("Invalid Credentials");
        }
    };

    return (
        <div style={styles.container}>

            <div style={styles.card}>

                <h2 style={styles.title}>Login</h2>

                <form onSubmit={handleLogin}>

                    <div style={styles.inputGroup}>
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="example@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="******"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                        />
                    </div>

                    <button type="submit" style={styles.button}>
                        Login
                    </button>

                </form>

            </div>

        </div>
    );
}

const styles = {
    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #cce3ff, #e6f0ff)"
    },
    card: {
        background: "#fff",
        padding: "30px",
        borderRadius: "10px",
        width: "320px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
    },
    title: {
        textAlign: "center",
        marginBottom: "20px"
    },
    inputGroup: {
        marginBottom: "15px",
        display: "flex",
        flexDirection: "column"
    },
    input: {
        padding: "10px",
        marginTop: "5px",
        borderRadius: "5px",
        border: "1px solid #ccc"
    },
    button: {
        width: "100%",
        padding: "10px",
        backgroundColor: "#2d6cdf",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
    }
};

export default Login;