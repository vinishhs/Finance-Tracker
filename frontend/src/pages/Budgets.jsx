import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import BudgetForm from '../components/Budgets/BudgetForm';
import BudgetProgress from '../components/Budgets/BudgetProgress';
import { formatCurrency } from '../utils/formatCurrency';

const Budgets = ({ user, logout }) => {
  const [budgets, setBudgets] = useState([]);
  const [tab, setTab] = useState('monthly');

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const res = await api.get('/api/budgets');
      setBudgets(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Budgets</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Manage your monthly budgets to stay on track with your financial goals.</p>
      </div>
      <div className="border-b border-primary/20 dark:border-primary/30">
        <nav aria-label="Tabs" className="-mb-px flex space-x-8">
          <button
            onClick={() => setTab('monthly')}
            className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${tab === 'monthly' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300'}`}
          >
            Monthly Budgets
          </button>
          <button
            onClick={() => setTab('category')}
            className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${tab === 'category' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300'}`}
          >
            Category Budgets
          </button>
        </nav>
      </div>
      <BudgetForm onSuccess={fetchBudgets} />
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{tab.charAt(0).toUpperCase() + tab.slice(1)} Budgets</h2>
        <div className="overflow-x-auto rounded-lg border border-primary/20 dark:border-primary/30">
          <table className="min-w-full divide-y divide-primary/20 dark:divide-primary/30">
            <thead className="bg-primary/10 dark:bg-primary/20">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400" scope="col">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400" scope="col">Budget</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400" scope="col">Spent</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400" scope="col">Remaining</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400" scope="col">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/10 dark:divide-primary/20 bg-background-light dark:bg-background-dark">
              {budgets.map((b) => {
                const spent = b.spent || 0;
                const progress = (spent / b.amount) * 100;
                const isOverspent = spent > b.amount;
                const remaining = b.amount - spent;
                return (
                  <tr key={b._id}>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{b.category}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{formatCurrency(b.amount)}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{formatCurrency(spent)}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm" style={{ color: isOverspent ? 'red' : 'inherit' }}>{formatCurrency(remaining)}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <BudgetProgress category={b.category} amount={b.amount} spent={spent} overspent={isOverspent} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Budgets;