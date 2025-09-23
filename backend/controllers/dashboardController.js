const Transaction = require('../models/Transaction');
const Budget = require('../models/Budget');

exports.getOverview = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id });
    const budgets = await Budget.find({ user: req.user.id });

    const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const balance = totalIncome - totalExpense;
    const recentTransactions = transactions.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
    const budgetProgress = budgets.map(b => ({
      category: b.category,
      amount: b.amount,
      spent: transactions.filter(t => t.category === b.category && t.type === 'expense').reduce((sum, t) => sum + t.amount, 0),
      overspent: transactions.filter(t => t.category === b.category && t.type === 'expense').reduce((sum, t) => sum + t.amount, 0) > b.amount,
    }));

    res.json({ balance, totalIncome, totalExpense, recentTransactions, budgetProgress });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};