const Expense = require("../Expense");

// GET ALL EXPENSES
const getExpenses = async (req, res) => {
  try {
    console.log("LOGGED IN USER ID:", req.userId);

    const expenses = await Expense.find({
      userId: req.userId
    });

    res.json(expenses);

  } catch (error) {
    console.log("GET EXPENSE ERROR:", error);

    res.status(500).json({
      message: "Server error"
    });
  }
};
// ADD EXPENSE
const addExpense = async (req, res) => {
  try {
    const { title, amount, date ,category } = req.body;

    const newExpense = new Expense({
      title,
      amount,
      date,
      category,
      userId: req.userId
    });

    await newExpense.save();

    res.status(201).json(newExpense);

  } catch (error) {
    console.log("ADD EXPENSE ERROR:", error);

    res.status(500).json({
      message: "Server error"
    });
  }
};


// UPDATE EXPENSE
const updateExpense = async (req, res) => {
  try {
    const { title, amount, date, category } = req.body;

    const expense = await Expense.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found"
      });
    }

    expense.title = title;
    expense.amount = amount;
    expense.category = category;
    expense.date = date;

    
    await expense.save();

    res.json(expense);

  } catch (error) {
    console.log("UPDATE EXPENSE ERROR:", error);

    res.status(500).json({
      message: "Server error"
    });
  }
};


// DELETE EXPENSE
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found"
      });
    }

    await Expense.findByIdAndDelete(req.params.id);

    res.json({
      message: "Expense deleted successfully"
    });

  } catch (error) {
    console.log("DELETE EXPENSE ERROR:", error);

    res.status(500).json({
      message: "Server error"
    });
  }
};

// GET EXPENSES BY USER ID
const getExpensesByUser = async (req, res) => {
  try {
    console.log("USER ID RECEIVED:", req.userId);

    const expenses = await Expense.find({
      userId: req.userId
    });

    console.log("EXPENSES FOUND:", expenses);

    res.status(200).json(expenses);

  } catch (error) {
    console.log("GET USER EXPENSE ERROR:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

// module.exports = {
//   getExpenses,
//   addExpense,
//   updateExpense,
//   deleteExpense
// };
module.exports = {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
  getExpensesByUser
};