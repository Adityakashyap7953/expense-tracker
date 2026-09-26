// import { useState } from "react";
// import axios from "axios";

// function Login({ onLogin, onRegister }) {

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async (e) => {

//     e.preventDefault();

//     try {

//       const response = await axios.post(
//         "http://localhost:5000/api/auth/login",
//         {
//           email,
//           password
//         }
//       );

//       console.log("LOGIN RESPONSE:", response.data);

//       localStorage.setItem(
//         "token",
//         response.data.token
//       );

//       alert("Login successful!");

//       onLogin();

//     } catch (error) {

//       console.log("LOGIN ERROR:", error);

//       alert(
//         error.response?.data?.message ||
//         "Login failed"
//       );
//     }
//   };


//   return (

//     <div style={styles.container}>

//       <div style={styles.box}>

//         <h2>💰 Expense Tracker</h2>

//         <h3>Login</h3>

//         <form onSubmit={handleLogin}>

//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) =>
//               setEmail(e.target.value)
//             }
//             style={styles.input}
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) =>
//               setPassword(e.target.value)
//             }
//             style={styles.input}
//           />

//           <button
//             type="submit"
//             style={styles.button}
//           >
//             Login
//           </button>

//         </form>

//         <br />

//         <button
//           onClick={onRegister}
//           style={styles.linkButton}
//         >
//           Create New Account
//         </button>

//       </div>

//     </div>
//   );
// }


// const styles = {

//   container: {
//     minHeight: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     background:
//       "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
//   },

//   box: {
//     backgroundColor: "white",
//     padding: "30px",
//     borderRadius: "15px",
//     width: "350px",
//     boxShadow: "0 5px 20px rgba(0,0,0,0.3)",
//   },

//   input: {
//     width: "100%",
//     padding: "12px",
//     marginBottom: "12px",
//     boxSizing: "border-box",
//     borderRadius: "8px",
//     border: "1px solid #ddd",
//   },

//   button: {
//     width: "100%",
//     padding: "12px",
//     backgroundColor: "#4CAF50",
//     color: "white",
//     border: "none",
//     borderRadius: "8px",
//     cursor: "pointer",
//   },

//   linkButton: {
//     width: "100%",
//     padding: "10px",
//     backgroundColor: "#2196F3",
//     color: "white",
//     border: "none",
//     borderRadius: "8px",
//     cursor: "pointer",
//   }
// };

// export default Login;


// -----------------------------------------------------------------------------


import { useState } from "react";
import axios from "axios";

function Login({ onLogin, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      console.log("LOGIN RESPONSE:", response.data);

      // JWT token save
      localStorage.setItem("token", response.data.token);

      // User information save if backend sends it
      if (response.data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );
      }

      onLogin();

    } catch (error) {
      console.log("LOGIN ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Login failed. Please check your email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.backgroundShape1}></div>
      <div style={styles.backgroundShape2}></div>

      <div style={styles.container}>

        {/* LEFT BRANDING */}
        <div style={styles.leftSection}>
          <div style={styles.logoCircle}>💰</div>

          <h1 style={styles.brandTitle}>
            Expense
            <br />
            Tracker
          </h1>

          <p style={styles.brandText}>
            Manage your expenses,
            <br />
            track your spending
            <br />
            and stay in control.
          </p>

          <div style={styles.feature}>
            <span style={styles.featureIcon}>✓</span>
            <span>Track your daily expenses</span>
          </div>

          <div style={styles.feature}>
            <span style={styles.featureIcon}>✓</span>
            <span>Manage expense categories</span>
          </div>

          <div style={styles.feature}>
            <span style={styles.featureIcon}>✓</span>
            <span>View your spending summary</span>
          </div>
        </div>

        {/* LOGIN CARD */}
        <div style={styles.loginSection}>
          <div style={styles.loginCard}>

            <div style={styles.mobileLogo}>
              💰
            </div>

            <h2 style={styles.welcome}>
              Welcome Back! 👋
            </h2>

            <p style={styles.subtitle}>
              Login to manage your expenses
            </p>

            <form onSubmit={handleLogin}>

              <label style={styles.label}>
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                style={styles.input}
              />

              <label style={styles.label}>
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                style={styles.input}
              />

              <div style={styles.forgotRow}>
                <span style={styles.rememberText}>
                  Secure Login
                </span>

                <span style={styles.lockIcon}>
                  🔒
                </span>
              </div>

              <button
                type="submit"
                style={{
                  ...styles.loginButton,
                  opacity: loading ? 0.7 : 1,
                }}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

            </form>

            <div style={styles.divider}>
              <span style={styles.line}></span>
              <span style={styles.orText}>OR</span>
              <span style={styles.line}></span>
            </div>

            <button
              onClick={onRegister}
              style={styles.registerButton}
            >
              Create New Account
            </button>

            <p style={styles.bottomText}>
              Don't have an account yet?
              <button
                onClick={onRegister}
                style={styles.createLink}
              >
                Register
              </button>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    background:
      "linear-gradient(135deg, #111827 0%, #172554 45%, #312e81 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily:
      "Arial, Helvetica, sans-serif",
    position: "relative",
    overflow: "hidden",
    padding: "30px",
    boxSizing: "border-box",
  },

  backgroundShape1: {
    position: "absolute",
    width: "450px",
    height: "450px",
    borderRadius: "50%",
    background:
      "rgba(124, 58, 237, 0.15)",
    top: "-180px",
    right: "-120px",
  },

  backgroundShape2: {
    position: "absolute",
    width: "350px",
    height: "350px",
    borderRadius: "50%",
    background:
      "rgba(59, 130, 246, 0.12)",
    bottom: "-150px",
    left: "-100px",
  },

  container: {
    width: "100%",
    maxWidth: "1050px",
    minHeight: "620px",
    background: "rgba(255,255,255,0.08)",
    border:
      "1px solid rgba(255,255,255,0.15)",
    borderRadius: "28px",
    display: "flex",
    overflow: "hidden",
    position: "relative",
    zIndex: 2,
    boxShadow:
      "0 25px 70px rgba(0,0,0,0.35)",
    backdropFilter: "blur(12px)",
  },

  leftSection: {
    width: "48%",
    padding: "70px 55px",
    boxSizing: "border-box",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  logoCircle: {
    width: "72px",
    height: "72px",
    borderRadius: "20px",
    background:
      "linear-gradient(135deg, #7c3aed, #4f46e5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "38px",
    marginBottom: "25px",
    boxShadow:
      "0 12px 30px rgba(124,58,237,0.35)",
  },

  brandTitle: {
    fontSize: "48px",
    lineHeight: "1.05",
    margin: "0 0 20px",
    fontWeight: "800",
    letterSpacing: "-1px",
  },

  brandText: {
    color: "#c7d2fe",
    fontSize: "18px",
    lineHeight: "1.7",
    marginBottom: "35px",
  },

  feature: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "16px",
    color: "#e0e7ff",
    fontSize: "15px",
  },

  featureIcon: {
    width: "25px",
    height: "25px",
    borderRadius: "50%",
    background: "#22c55e",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "bold",
  },

  loginSection: {
    width: "52%",
    background: "#f8fafc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "35px",
    boxSizing: "border-box",
  },

  loginCard: {
    width: "100%",
    maxWidth: "410px",
  },

  mobileLogo: {
    display: "none",
  },

  welcome: {
    fontSize: "32px",
    color: "#111827",
    margin: "0 0 8px",
    fontWeight: "800",
  },

  subtitle: {
    color: "#64748b",
    margin: "0 0 32px",
    fontSize: "15px",
  },

  label: {
    display: "block",
    color: "#334155",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "8px",
  },

  input: {
    width: "100%",
    padding: "15px 16px",
    marginBottom: "20px",
    boxSizing: "border-box",
    borderRadius: "12px",
    border: "1px solid #dbe2ea",
    background: "white",
    fontSize: "15px",
    outline: "none",
    color: "#111827",
  },

  forgotRow: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: "18px",
    gap: "6px",
  },

  rememberText: {
    color: "#64748b",
    fontSize: "13px",
  },

  lockIcon: {
    fontSize: "13px",
  },

  loginButton: {
    width: "100%",
    padding: "15px",
    background:
      "linear-gradient(135deg, #7c3aed, #6366f1)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "700",
    boxShadow:
      "0 8px 20px rgba(124,58,237,0.25)",
  },

  divider: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    margin: "25px 0",
  },

  line: {
    height: "1px",
    background: "#e2e8f0",
    flex: 1,
  },

  orText: {
    color: "#94a3b8",
    fontSize: "12px",
    fontWeight: "600",
  },

  registerButton: {
    width: "100%",
    padding: "14px",
    background: "white",
    color: "#6366f1",
    border: "2px solid #6366f1",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "700",
  },

  bottomText: {
    textAlign: "center",
    color: "#64748b",
    fontSize: "13px",
    marginTop: "22px",
  },

  createLink: {
    background: "none",
    border: "none",
    color: "#6366f1",
    fontWeight: "700",
    cursor: "pointer",
    marginLeft: "5px",
    fontSize: "13px",
  },
};

export default Login;
