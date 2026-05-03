import { useState, useEffect } from "react";
import axios from "axios";

// Backend ka address
// const API = "http://localhost:5000/expenses";   //ye loacl host ke liye api ka hai aur wifichange hne pe same krni pdegi
// const API = "http://192.168.1.42:5000/expenses";  

// const API = "http://localhost:5000/expenses";
// const API = "/expenses";

// render pe deploy hone ke ----
const API = "https://expense-tracker-9t9n.onrender.com/expenses";

function App() {
  // Expenses ki empty list se shuru karo
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  // Page load hone pe backend se saare expenses lao
  useEffect(() => {
    axios.get(API).then((res) => setExpenses(res.data));
  }, []);

  // Backend me naya expense save karo
  const addExpense = async () => {
    if (!title || !amount) return;
    const newExpense = {
      title,
      amount,
      date: new Date().toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    const res = await axios.post(API, newExpense);
    setExpenses([...expenses, res.data]);
    setTitle("");
    setAmount("");
  };

  // Backend se expense delete karo
  const deleteExpense = async (id) => {
    await axios.delete(`${API}/${id}`);
    setExpenses(expenses.filter((exp) => exp._id !== id));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>💰 Expense Tracker</h2>

      <div style={styles.form}>
        <input
          placeholder="Kharcha ka naam"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
        <input
          placeholder="Amount ₹"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={styles.input}
          type="number"
        />
        <button onClick={addExpense} style={styles.addButton}>
          + Add Expense
        </button>
      </div>

      <div style={styles.list}>
        {expenses.length === 0 && (
          <p style={styles.empty}>Koi kharcha nahi abhi tak 😄</p>
        )}
        {/* 
          expenses.map - har ek expense ke liye ek card banao
          pehle: (exp, index) tha - index se delete hota tha
          ab: sirf (exp) hai - MongoDB ka _id se delete hoga
          pehle: key={index} tha, ab: key={exp._id} hai
        */}
        {expenses.map((exp) => (
          <div key={exp._id} style={styles.item}>
            <div>
              <p style={styles.itemTitle}>{exp.title}</p>
              <p style={styles.itemDate}>{exp.date}</p>
            </div>
            <div style={styles.itemRight}>
              <p style={styles.itemAmount}>₹{exp.amount}</p>
              <button
                onClick={() => deleteExpense(exp._id)}
                style={styles.deleteButton}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {expenses.length > 0 && (
        <div style={styles.total}>
          <span>Total Kharcha</span>
          <span style={styles.totalAmount}>
            ₹{expenses.reduce((total, exp) => total + Number(exp.amount), 0)}
          </span>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "480px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    minHeight: "100vh",
  },
  header: {
    textAlign: "center",
    color: "white",
    fontSize: "24px",
    marginBottom: "20px",
  },
  form: {
    backgroundColor: "white",
    padding: "16px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "16px",
    boxSizing: "border-box",
  },
  addButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
  },
  list: {
    marginBottom: "20px",
  },
  empty: {
    textAlign: "center",
    color: "white",
    marginTop: "40px",
  },
  item: {
    backgroundColor: "white",
    padding: "14px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemTitle: {
    margin: 0,
    fontWeight: "bold",
    color: "#2d2d2d",
    fontSize: "16px",
  },
  itemDate: {
    margin: 0,
    fontSize: "12px",
    color: "gray",
    marginTop: "4px",
  },
  itemRight: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  itemAmount: {
    margin: 0,
    fontWeight: "bold",
    color: "#4CAF50",
    fontSize: "16px",
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    border: "none",
    borderRadius: "8px",
    padding: "6px 10px",
    cursor: "pointer",
    fontSize: "16px",
  },
  total: {
    backgroundColor: "white",
    padding: "16px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "18px",
    fontWeight: "bold",
  },
  totalAmount: {
    color: "#4CAF50",
    fontSize: "22px",
  },
};

export default App;
