// import { useState, useEffect } from "react";
// import axios from "axios";

// // const API = "https://expense-tracker-9t9n.onrender.com/expenses";
// const API = "http://localhost:5000/expenses";

// function Dashboard({ onLogout }) {

//   const [expenses, setExpenses] = useState([]);

//   const [title, setTitle] = useState("");
//   const [amount, setAmount] = useState("");

//   const [editId, setEditId] = useState(null);

//   const token = localStorage.getItem("token");

//   // =========================
//   // GET EXPENSES
//   // =========================

//   const getExpenses = async () => {

//     try {

//       const response = await axios.get(API, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       console.log("Backend Data:", response.data);

//       if (Array.isArray(response.data)) {
//         setExpenses(response.data.reverse());
//       } else {
//         setExpenses([]);
//       }

//     } catch (error) {

//       console.log("Data fetch error:", error);

//       // Token invalid/expired
//       if (error.response?.status === 401) {

//         alert("Session expired. Please login again.");

//         localStorage.removeItem("token");

//         onLogout();
//       }
//     }
//   };


//   useEffect(() => {

//     getExpenses();

//   }, []);


//   // =========================
//   // ADD / UPDATE EXPENSE
//   // =========================

//   const handleSubmit = async () => {

//     if (!title || !amount) {
//       alert("Please enter title and amount");
//       return;
//     }

//     const expenseData = {
//       title,
//       amount: Number(amount),
//       date: new Date().toLocaleString("en-IN", {
//         day: "numeric",
//         month: "short",
//         year: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
//     };

//     try {

//       // UPDATE
//       if (editId) {

//         const response = await axios.put(
//           `${API}/${editId}`,
//           expenseData,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`
//             }
//           }
//         );

//         setExpenses(
//           expenses.map((expense) =>
//             expense._id === editId
//               ? response.data
//               : expense
//           )
//         );

//         alert("Expense updated successfully!");

//         setEditId(null);

//       }

//       // ADD
//       else {

//         const response = await axios.post(
//           API,
//           expenseData,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`
//             }
//           }
//         );

//         setExpenses([
//           response.data,
//           ...expenses
//         ]);

//         alert("Expense added successfully!");
//       }

//       setTitle("");
//       setAmount("");

//     } catch (error) {

//       console.log(
//         "ADD/UPDATE EXPENSE ERROR:",
//         error
//       );

//       alert(
//         error.response?.data?.message ||
//         "Something went wrong"
//       );
//     }
//   };


//   // =========================
//   // EDIT
//   // =========================

//   const editExpense = (expense) => {

//     setEditId(expense._id);

//     setTitle(expense.title);

//     setAmount(expense.amount);
//   };


//   // =========================
//   // DELETE
//   // =========================

//   const deleteExpense = async (id) => {

//     try {

//       await axios.delete(
//         `${API}/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       setExpenses(
//         expenses.filter(
//           (expense) => expense._id !== id
//         )
//       );

//       alert("Expense deleted successfully!");

//     } catch (error) {

//       console.log(
//         "DELETE EXPENSE ERROR:",
//         error
//       );
//     }
//   };


//   // =========================
//   // LOGOUT
//   // =========================

//   const logout = () => {

//     localStorage.removeItem("token");

//     onLogout();
//   };


//   // =========================
//   // TOTAL
//   // =========================

//   const totalExpense = expenses.reduce(
//     (total, expense) =>
//       total + Number(expense.amount),
//     0
//   );


//   return (

//     <div style={styles.container}>

//       <div style={styles.topBar}>

//         <h2 style={styles.header}>
//           💰 Expense Tracker
//         </h2>

//         <button
//           onClick={logout}
//           style={styles.logoutButton}
//         >
//           Logout
//         </button>

//       </div>


//       {/* ADD / EDIT FORM */}

//       <div style={styles.form}>

//         <h3>
//           {editId
//             ? "Edit Expense"
//             : "Add Expense"}
//         </h3>

//         <input
//           placeholder="Kharcha ka naam"
//           value={title}
//           onChange={(e) =>
//             setTitle(e.target.value)
//           }
//           style={styles.input}
//         />

//         <input
//           placeholder="Amount ₹"
//           value={amount}
//           onChange={(e) =>
//             setAmount(e.target.value)
//           }
//           style={styles.input}
//           type="number"
//         />

//         <button
//           onClick={handleSubmit}
//           style={styles.addButton}
//         >
//           {editId
//             ? "Update Expense"
//             : "+ Add Expense"}
//         </button>

//         {editId && (

//           <button
//             onClick={() => {
//               setEditId(null);
//               setTitle("");
//               setAmount("");
//             }}
//             style={styles.cancelButton}
//           >
//             Cancel Edit
//           </button>

//         )}

//       </div>


//       {/* EXPENSE LIST */}

//       <div style={styles.list}>

//         {expenses.length === 0 && (

//           <p style={styles.empty}>
//             Koi kharcha nahi abhi tak 😄
//           </p>

//         )}


//         {expenses.map((exp) => (

//           <div
//             key={exp._id}
//             style={styles.item}
//           >

//             <div>

//               <p style={styles.itemTitle}>
//                 {exp.title}
//               </p>

//               <p style={styles.itemDate}>
//                 {exp.date}
//               </p>

//             </div>


//             <div style={styles.itemRight}>

//               <p style={styles.itemAmount}>
//                 ₹{exp.amount}
//               </p>

//               <button
//                 onClick={() =>
//                   editExpense(exp)
//                 }
//                 style={styles.editButton}
//               >
//                 ✏️
//               </button>

//               <button
//                 onClick={() =>
//                   deleteExpense(exp._id)
//                 }
//                 style={styles.deleteButton}
//               >
//                 🗑️
//               </button>

//             </div>

//           </div>

//         ))}

//       </div>


//       {/* TOTAL */}

//       {expenses.length > 0 && (

//         <div style={styles.total}>

//           <span>
//             Total Kharcha
//           </span>

//           <span style={styles.totalAmount}>
//             ₹{totalExpense}
//           </span>

//         </div>

//       )}

//     </div>
//   );
// }


// const styles = {

//   container: {
//     maxWidth: "480px",
//     margin: "0 auto",
//     padding: "20px",
//     fontFamily: "Arial, sans-serif",
//     background:
//       "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
//     minHeight: "100vh",
//   },

//   topBar: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   header: {
//     color: "white",
//     fontSize: "24px",
//   },

//   logoutButton: {
//     backgroundColor: "#ff4d4d",
//     color: "white",
//     border: "none",
//     borderRadius: "8px",
//     padding: "8px 12px",
//     cursor: "pointer",
//   },

//   form: {
//     backgroundColor: "white",
//     padding: "16px",
//     borderRadius: "12px",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//     marginBottom: "20px",
//   },

//   input: {
//     width: "100%",
//     padding: "10px",
//     marginBottom: "10px",
//     borderRadius: "8px",
//     border: "1px solid #ddd",
//     fontSize: "16px",
//     boxSizing: "border-box",
//   },

//   addButton: {
//     width: "100%",
//     padding: "12px",
//     backgroundColor: "#4CAF50",
//     color: "white",
//     border: "none",
//     borderRadius: "8px",
//     fontSize: "16px",
//     cursor: "pointer",
//   },

//   cancelButton: {
//     width: "100%",
//     padding: "10px",
//     marginTop: "8px",
//     backgroundColor: "#777",
//     color: "white",
//     border: "none",
//     borderRadius: "8px",
//     cursor: "pointer",
//   },

//   list: {
//     marginBottom: "20px",
//   },

//   empty: {
//     textAlign: "center",
//     color: "white",
//     marginTop: "40px",
//   },

//   item: {
//     backgroundColor: "white",
//     padding: "14px",
//     borderRadius: "12px",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
//     marginBottom: "10px",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   itemTitle: {
//     margin: 0,
//     fontWeight: "bold",
//     color: "#2d2d2d",
//     fontSize: "16px",
//   },

//   itemDate: {
//     margin: 0,
//     fontSize: "12px",
//     color: "gray",
//     marginTop: "4px",
//   },

//   itemRight: {
//     display: "flex",
//     alignItems: "center",
//     gap: "6px",
//   },

//   itemAmount: {
//     margin: 0,
//     fontWeight: "bold",
//     color: "#4CAF50",
//     fontSize: "16px",
//   },

//   editButton: {
//     backgroundColor: "#2196F3",
//     color: "white",
//     border: "none",
//     borderRadius: "8px",
//     padding: "6px 10px",
//     cursor: "pointer",
//   },

//   deleteButton: {
//     backgroundColor: "#ff4d4d",
//     color: "white",
//     border: "none",
//     borderRadius: "8px",
//     padding: "6px 10px",
//     cursor: "pointer",
//   },

//   total: {
//     backgroundColor: "white",
//     padding: "16px",
//     borderRadius: "12px",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     fontSize: "18px",
//     fontWeight: "bold",
//   },

//   totalAmount: {
//     color: "#4CAF50",
//     fontSize: "22px",
//   },
// };

// export default Dashboard;





// ----------------------------------------------------------------------
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "http://localhost:5000/expenses";

const defaultCategories = [
  "Food",
  "Travel",
  "Medicine",
  "Shopping",
  "Vegetables",
  "Fruits",
  "Bills",
  "Education",
  "Other",
];

function Dashboard({ onLogout }) {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  
const [categoryList, setCategoryList] = useState([]);
const [newCategory, setNewCategory] = useState("");
const [showAddCategory, setShowAddCategory] = useState(false);
const [editingCategoryId, setEditingCategoryId] = useState(null);
const [editCategoryName, setEditCategoryName] = useState("");

const [activePage, setActivePage] = useState("dashboard");
// - const [activePage, setActivePage] = useState("expense");
  const [user, setUser] = useState({
    name: "User",
    email: "",
  });

  const [categories, setCategories] = useState(defaultCategories);

  // =========================
  // TOKEN
  // =========================

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // =========================
  // USER DATA
  // =========================

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.log("User data error:", error);
    }
  }, []);

  // =========================
  // GET EXPENSES
  // =========================

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(API, config);

      if (Array.isArray(response.data)) {
        setExpenses(response.data.reverse());
      }
    } catch (error) {
      console.log("Expense fetch error:", error);

      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");
      }
    }
  };

  useEffect(() => {
    if (token) {
      fetchExpenses();
    }
  }, []);

  // =========================
  // ADD / UPDATE EXPENSE
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !amount) {
      alert("Please enter expense name and amount");
      return;
    }

    const expenseData = {
      title,
      amount,
      category,
      date: new Date().toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    try {
      if (editingId) {
        const response = await axios.put(
          `${API}/${editingId}`,
          expenseData,
          config
        );

        setExpenses(
          expenses.map((expense) =>
            expense._id === editingId ? response.data : expense
          )
        );

        setEditingId(null);
      } else {
        const response = await axios.post(API, expenseData, config);

        setExpenses([response.data, ...expenses]);
      }

      setTitle("");
      setAmount("");
      setCategory("Food");
    } catch (error) {
      console.log("Expense save error:", error);
      alert("Unable to save expense");
    }
  };

  // =========================
  // EDIT
  // =========================

  const handleEdit = (expense) => {
    setEditingId(expense._id);
    setTitle(expense.title);
    setAmount(expense.amount);
    setCategory(expense.category || "Food");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API}/${id}`, config);

      setExpenses(expenses.filter((expense) => expense._id !== id));
    } catch (error) {
      console.log("Delete error:", error);
      alert("Unable to delete expense");
    }
  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";
  };

  // =========================
  // TOTAL
  // =========================

  const totalExpense = expenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0
  );

  const averageExpense =
    expenses.length > 0 ? Math.round(totalExpense / expenses.length) : 0;

  // =========================
  // CATEGORY TOTAL
  // =========================

  const categoryTotals = {};

  expenses.forEach((expense) => {
    const cat = expense.category || "Other";

    categoryTotals[cat] =
      (categoryTotals[cat] || 0) + Number(expense.amount);
  });

  const highestCategory = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1]
  )[0];

  // =========================
  // SEARCH
  // =========================

  const filteredExpenses = expenses.filter((expense) =>
    `${expense.title} ${expense.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="dashboard">

      {/* ================= SIDEBAR ================= */}

    <aside className="sidebar">

  <div className="brand">
    <span className="brand-icon">💰</span>
    <span>Expense Tracker</span>
  </div>

  <nav className="navigation">

    <button
      className={`nav-item ${
        activePage === "dashboard" ? "active" : ""
      }`}
      onClick={() => setActivePage("dashboard")}
    >
      🏠
      <span>Dashboard</span>
    </button>

    <button
      className={`nav-item ${
        activePage === "expenses" ? "active" : ""
      }`}
      onClick={() => setActivePage("expenses")}
    >
      💳
      <span>Expenses</span>
    </button>

    <button className="nav-item">
      📂
      <span>Categories</span>
    </button>

    <button className="nav-item">
      📊
      <span>Analytics</span>
    </button>

    <button className="nav-item">
      📄
      <span>Reports</span>
    </button>

    <button className="nav-item">
      ⚙️
      <span>Settings</span>
    </button>

  </nav>

  <div className="sidebar-bottom">

    {/* <div className="premium-box">
      <div className="premium-title">
        👑 Go Premium
      </div>

      <p>
        Unlock advanced analytics and reports.
      </p>

      <button>
        Upgrade Now
      </button>
    </div> */}

    <button
      className="logout-button"
      onClick={handleLogout}
    >
      🚪 Logout
    </button>

  </div>

</aside>

      <main className="main-content">

        {/* HEADER */}

        <header className="top-header">

          <div>
            <h1>
              Welcome back, {user.name || "User"} 👋
            </h1>

            <p>
              Here's what's happening with your expenses
            </p>
          </div>

          <div className="header-right">

            <input
              type="text"
              placeholder="Search expenses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-box"
            />

            <span className="notification">
              🔔
            </span>

            <div className="profile-mini">

              <div className="avatar">
                {(user.name || "U")
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div>
                <strong>
                  {user.name || "User"}
                </strong>

                <small>
                  {user.email}
                </small>
              </div>

            </div>

          </div>

        </header>

                  {activePage === "dashboard" && (
<>
        {/* ================= SUMMARY CARDS ================= */}

        <section className="summary-grid">

          <div className="summary-card purple">
            <div className="summary-icon">💰</div>

            <div>
              <span>Total Expense</span>
              <h2>₹{totalExpense.toLocaleString("en-IN")}</h2>
              <small>↗ Your total spending</small>
            </div>
          </div>

          <div className="summary-card blue">
            <div className="summary-icon">🧾</div>

            <div>
              <span>Total Transactions</span>
              <h2>{expenses.length}</h2>
              <small>↗ All transactions</small>
            </div>
          </div>

          <div className="summary-card green">
            <div className="summary-icon">📈</div>

            <div>
              <span>Average Expense</span>
              <h2>₹{averageExpense.toLocaleString("en-IN")}</h2>
              <small>↗ Per transaction</small>
            </div>
          </div>

          <div className="summary-card orange">
            <div className="summary-icon">🏆</div>

            <div>
              <span>Highest Category</span>
              <h2>
                {highestCategory
                  ? highestCategory[0]
                  : "No Data"}
              </h2>

              <small>
                ₹
                {highestCategory
                  ? highestCategory[1].toLocaleString("en-IN")
                  : "0"}
              </small>
            </div>
          </div>

        </section>

        {/* ================= CONTENT GRID ================= */}

        <section className="content-grid">

          {/* ADD EXPENSE */}

          <div className="card add-expense-card">

            <div className="card-header">
              <div>
                <h2>
                  {editingId
                    ? "Edit Expense"
                    : "Add New Expense"}
                </h2>

                <p>
                  Track your spending easily
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>

              <div className="form-grid">

                <div className="form-group">
                  <label>Expense Name</label>

                  <input
                    type="text"
                    placeholder="Enter expense name"
                    value={title}
                    onChange={(e) =>
                      setTitle(e.target.value)
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Amount</label>

                  <input
                    type="number"
                    placeholder="₹ 0.00"
                    value={amount}
                    onChange={(e) =>
                      setAmount(e.target.value)
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Category</label>

                  <select
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value)
                    }
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Date & Time</label>

                  <input
                    type="text"
                    value={
                      new Date().toLocaleString(
                        "en-IN"
                      )
                    }
                    readOnly
                  />
                </div>

              </div>

              <div className="form-actions">

                <button
                  type="submit"
                  className="primary-button"
                >
                  {editingId
                    ? "✓ Update Expense"
                    : "+ Add Expense"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => {
                      setEditingId(null);
                      setTitle("");
                      setAmount("");
                      setCategory("Food");
                    }}
                  >
                    Cancel
                  </button>
                )}

              </div>

            </form>

          </div>

          {/* CATEGORIES */}

          <div className="card category-card">

            <div className="card-header">

              <div>
                <h2>Manage Categories</h2>
                <p>Your expense categories</p>
              </div>

              <button className="add-category-button">
                + Add Category
              </button>

            </div>

            <div className="category-list">

              {categories.slice(0, 7).map((cat) => (

                <div
                  className="category-row"
                  key={cat}
                >

                  <div className="category-name">
                    <span className="category-icon">
                      {cat === "Food"
                        ? "🍴"
                        : cat === "Travel"
                        ? "✈️"
                        : cat === "Medicine"
                        ? "💊"
                        : cat === "Shopping"
                        ? "🛍️"
                        : cat === "Vegetables"
                        ? "🥬"
                        : cat === "Fruits"
                        ? "🍎"
                        : "📦"}
                    </span>

                    <span>{cat}</span>
                  </div>

                  <span className="category-count">
                    {categoryTotals[cat] || 0}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </section>

        {/* ================= LOWER GRID ================= */}

        <section className="lower-grid">

          {/* RECENT EXPENSES */}

          <div className="card recent-card">

            <div className="card-header">

              <div>
                <h2>Recent Expenses</h2>
                <p>Your latest transactions</p>
              </div>

              <button className="view-all">
                View All
              </button>

            </div>

            <div className="expense-table">

              {filteredExpenses.length === 0 ? (

                <div className="no-expenses">
                  <div>💸</div>
                  <p>No expenses found</p>
                </div>

              ) : (

                filteredExpenses
                  .slice(0, 8)
                  .map((expense) => (

                    <div
                      className="expense-row"
                      key={expense._id}
                    >

                      <div className="expense-info">

                        <div className="expense-icon">
                          {expense.category ===
                          "Travel"
                            ? "✈️"
                            : expense.category ===
                              "Medicine"
                            ? "💊"
                            : expense.category ===
                              "Shopping"
                            ? "🛍️"
                            : "🍴"}
                        </div>

                        <div>
                          <strong>
                            {expense.title}
                          </strong>

                          <small>
                            {expense.date}
                          </small>
                        </div>

                      </div>

                      <span className="category-tag">
                        {expense.category ||
                          "Other"}
                      </span>

                      <strong className="expense-amount">
                        ₹
                        {Number(
                          expense.amount
                        ).toLocaleString("en-IN")}
                      </strong>

                      <div className="expense-actions">

                        <button
                          onClick={() =>
                            handleEdit(expense)
                          }
                          className="edit-btn"
                        >
                          ✏️
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(
                              expense._id
                            )
                          }
                          className="delete-btn"
                        >
                          🗑️
                        </button>

                      </div>

                    </div>

                  ))

              )}

            </div>

          </div>

          {/* PROFILE */}

          <div className="card profile-card">

            <div className="profile-large">

              <div className="large-avatar">
                {(user.name || "U")
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <h2>
                {user.name || "User"}
              </h2>

              <p>{user.email}</p>

            </div>

            <div className="profile-stat">
              <span>Total Expenses</span>
              <strong>
                ₹{totalExpense.toLocaleString("en-IN")}
              </strong>
            </div>

            <div className="profile-stat">
              <span>Transactions</span>
              <strong>{expenses.length}</strong>
            </div>

            <div className="profile-stat">
              <span>Categories</span>
              <strong>{categories.length}</strong>
            </div>

            <button className="profile-button">
              ⚙️ Profile Settings
            </button>

          </div>

               </section>
              </>
              )}

        {activePage === "expenses" && (

          <section className="card recent-card" style={{ width: "100%" }}>

            <div className="card-header">
              <div>
                <h2>All Expenses</h2>
                <p>Every transaction you've recorded</p>
              </div>
            </div>

            <div className="expense-table">

              {filteredExpenses.length === 0 ? (

                <div className="no-expenses">
                  <div>💸</div>
                  <p>No expenses found</p>
                </div>

              ) : (

                filteredExpenses.map((expense) => (

                  <div className="expense-row" key={expense._id}>

                    <div className="expense-info">
                      <div className="expense-icon">
                        {expense.category === "Travel"
                          ? "✈️"
                          : expense.category === "Medicine"
                          ? "💊"
                          : expense.category === "Shopping"
                          ? "🛍️"
                          : "🍴"}
                      </div>

                      <div>
                        <strong>{expense.title}</strong>
                        <small>{expense.date}</small>
                      </div>
                    </div>

                    <span className="category-tag">
                      {expense.category || "Other"}
                    </span>

                    <strong className="expense-amount">
                      ₹{Number(expense.amount).toLocaleString("en-IN")}
                    </strong>

                    <div className="expense-actions">
                      <button
                        onClick={() => handleEdit(expense)}
                        className="edit-btn"
                      >
                        ✏️
                      </button>

                      <button
                        onClick={() => handleDelete(expense._id)}
                        className="delete-btn"
                      >
                        🗑️
                      </button>
                    </div>

                  </div>

                ))

              )}

            </div>

          </section>

        )}

      </main>

    </div>
  );
}

export default Dashboard;