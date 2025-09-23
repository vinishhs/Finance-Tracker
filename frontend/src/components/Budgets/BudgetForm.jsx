import React, { useState } from 'react';
import api from '../../services/api';

const BudgetForm = ({ onSuccess }) => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || !amount) {
      setError('All fields are required');
      return;
    }
    try {
      await api.post('/api/budgets', { category, amount: parseFloat(amount) });
      onSuccess();
      setCategory('');
      setAmount('');
      setError('');
    } catch (err) {
      setError('Failed to add budget');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <h3 className="text-lg font-bold text-black dark:text-white">Add New Budget</h3>
      {error && <p className="text-red-500">{error}</p>}
      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category (e.g., Food)"
        required
        className="w-full p-2 border border-primary/20 dark:border-primary/30 rounded bg-background-light dark:bg-background-dark text-black dark:text-white focus:ring-primary focus:border-primary"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
        className="w-full p-2 border border-primary/20 dark:border-primary/30 rounded bg-background-light dark:bg-background-dark text-black dark:text-white focus:ring-primary focus:border-primary"
      />
      <button type="submit" className="px-4 py-2 bg-primary text-black rounded font-bold hover:opacity-90 transition-opacity">Add Budget</button>
    </form>
  );
};

export default BudgetForm;