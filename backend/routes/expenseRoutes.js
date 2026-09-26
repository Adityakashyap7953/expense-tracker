const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
  getExpensesByUser
} = require("../controllers/expenseController");

router.get("/", authMiddleware, getExpenses);

router.get("/user/:userId", authMiddleware, getExpensesByUser);

router.post("/", authMiddleware, addExpense);

router.put("/:id", authMiddleware, updateExpense);

router.delete("/:id", authMiddleware, deleteExpense);

module.exports = router;