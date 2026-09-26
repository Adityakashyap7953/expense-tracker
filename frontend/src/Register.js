import { useState } from "react";
import axios from "axios";

function Register({ onBackToLogin }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password
        }
      );

      console.log(
        "REGISTER RESPONSE:",
        response.data
      );

      alert("Registration successful!");

      onBackToLogin();

    } catch (error) {

      console.log(
        "REGISTER ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  };


  return (

    <div style={styles.container}>

      <div style={styles.box}>

        <h2>💰 Expense Tracker</h2>

        <h3>Create Account</h3>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            style={styles.input}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            style={styles.input}
          />

          <button
            type="submit"
            style={styles.button}
          >
            Register
          </button>

        </form>

        <br />

        <button
          onClick={onBackToLogin}
          style={styles.linkButton}
        >
          Already have an account? Login
        </button>

      </div>

    </div>
  );
}


const styles = {

  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
  },

  box: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "15px",
    width: "350px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.3)",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    boxSizing: "border-box",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },

  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  linkButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#2196F3",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  }
};

export default Register;