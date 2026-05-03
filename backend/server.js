require("dotenv").config();
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Expense = require('./Expense')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.log('Error:', err))

// GET - saare expenses lao
app.get('/expenses', async (req, res) => {
  const expenses = await Expense.find()
  res.json(expenses)
})

// POST - naya expense add karo
app.post('/expenses', async (req, res) => {
  const newExpense = new Expense({
    title: req.body.title,
    amount: req.body.amount,
    date: req.body.date
  })
  await newExpense.save()
  res.json(newExpense)
})

// DELETE - expense hatao
app.delete('/expenses/:id', async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id)
  res.json({ message: 'Deleted!' })
})

app.listen(5000, () => {
  console.log('Server start ho gaya port 5000 pe!')
})