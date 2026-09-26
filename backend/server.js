require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const expenseRoutes = require("./routes/expenseRoutes");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const authMiddleware = require("./middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.use("/expenses", expenseRoutes);

app.use("/categories", authMiddleware, categoryRoutes);

// MongoDB Connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log("MongoDB Error:", err));

// Middleware Test
app.get("/api/test", authMiddleware, (req, res) => {
  res.json({
    message: "Middleware working!",
    userId: req.userId
  });
});

// Server
app.listen(5000, () => {
  console.log("Server start ho gaya port 5000 pe!");
});