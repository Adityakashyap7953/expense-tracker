import { useState } from "react";

import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const [showRegister, setShowRegister] = useState(false);

  // Already logged in
  if (isLoggedIn) {
    return (
      <Dashboard
        onLogout={() => {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        }}
      />
    );
  }

  // Register page
  if (showRegister) {
    return (
      <Register
        onBackToLogin={() => {
          setShowRegister(false);
        }}
      />
    );
  }

  // Login page
  return (
    <Login
      onLogin={() => {
        setIsLoggedIn(true);
      }}
      onRegister={() => {
        setShowRegister(true);
      }}
    />
  );
}

export default App;