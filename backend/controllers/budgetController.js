const Budget = require('../models/Budget');

exports.createBudget = async (req, res) => {
  const { category, amount, period = 'monthly' } = req.body;
  try {
    // Ensure only valid periods are allowed
    const validPeriods = ['monthly', 'yearly'];
    if (!validPeriods.includes(period)) {
      return res.status(400).json({ msg: 'Invalid period. Allowed: monthly, yearly' });
    }

    const budgetExists = await Budget.findOne({ user: req.user.id, category, period });
    if (budgetExists) return res.status(400).json({ msg: 'Budget for this category and period already exists' });

    const budget = await Budget.create({ user: req.user.id, category, amount, period });
    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user.id });
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};