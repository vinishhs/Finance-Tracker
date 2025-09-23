const Transaction = require('../models/Transaction');

exports.getReports = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id });
    const monthlySummary = transactions.reduce((acc, t) => {
      const month = new Date(t.date).toLocaleString('default', { month: 'long' });
      acc[month] = acc[month] || { income: 0, expense: 0 };
      acc[month][t.type] += t.amount;
      return acc;
    }, {});

    res.json({ monthlySummary });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};