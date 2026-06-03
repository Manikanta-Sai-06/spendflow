const express = require('express');
const Expense = require('../models/Expense');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Protect all expense routes
router.use(authMiddleware);

// Create an expense
router.post('/', async (req, res) => {
  try {
    const { title, amount, category, date, note } = req.body;

    if (!title || !amount || !category) {
      return res.status(400).json({ message: 'Please provide title, amount, and category' });
    }

    const newExpense = new Expense({
      title,
      amount,
      category,
      date: date ? new Date(date) : Date.now(),
      note,
      user: req.user.id,
    });

    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all expenses (with optional filters)
router.get('/', async (req, res) => {
  try {
    const { category, month } = req.query;
    
    let query = { user: req.user.id };

    if (category) {
      query.category = category;
    }

    if (month) {
      // month format expected: YYYY-MM
      const startDate = new Date(`${month}-01T00:00:00.000Z`);
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1);
      
      query.date = {
        $gte: startDate,
        $lt: endDate,
      };
    }

    const expenses = await Expense.find(query).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single expense
router.get('/:id', async (req, res) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id, user: req.user.id });
    
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    
    res.json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update an expense
router.put('/:id', async (req, res) => {
  try {
    const { title, amount, category, date, note } = req.body;

    const expense = await Expense.findOne({ _id: req.params.id, user: req.user.id });
    
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    expense.title = title || expense.title;
    expense.amount = amount || expense.amount;
    expense.category = category || expense.category;
    if (date) expense.date = new Date(date);
    expense.note = note !== undefined ? note : expense.note;

    const updatedExpense = await expense.save();
    res.json(updatedExpense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete an expense
router.delete('/:id', async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
