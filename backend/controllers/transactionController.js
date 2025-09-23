const Transaction = require('../models/Transaction');

exports.createTransaction = async (req, res) => {
  const { type, amount, category, description } = req.body;
  try {
    const transaction = await Transaction.create({ user: req.user.id, type, amount, category, description, date: new Date() });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.updateTransaction = async (req, res) => {
  const { type, amount, category, description } = req.body;
  try {
    const transaction = await Transaction.findByIdAndUpdate(req.params.id, { type, amount, category, description }, { new: true });
    if (!transaction) return res.status(404).json({ msg: 'Transaction not found' });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction) return res.status(404).json({ msg: 'Transaction not found' });
    res.json({ msg: 'Transaction deleted' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};