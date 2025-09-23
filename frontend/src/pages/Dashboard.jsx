import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Modal from '../components/common/Modal';
import TransactionForm from '../components/Transactions/TransactionForm';
import OverviewCard from '../components/Dashboard/OverviewCard';
import RecentTransactions from '../components/Dashboard/RecentTransactions';
import { formatCurrency } from '../utils/formatCurrency';

const Dashboard = () => {
  const [data, setData] = useState({
    balance: 12345.67,
    totalIncome: 5000,
    totalExpense: 3000,
    recentTransactions: [
      {
        id: 1,
        date: '2023-08-15',
        description: 'Grocery Shopping',
        category: 'Food',
        amount: -75.50,
      },
      {
        id: 2,
        date: '2023-08-14',
        description: 'Salary Deposit',
        category: 'Income',
        amount: 3000.00,
      },
      {
        id: 3,
        date: '2023-08-12',
        description: 'Rent Payment',
        category: 'Housing',
        amount: -1200.00,
      },
      {
        id: 4,
        date: '2023-08-10',
        description: 'Dinner with Friends',
        category: 'Entertainment',
        amount: -50.00,
      }
    ]
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get('/api/dashboard/overview');
      // setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleTransactionAdded = () => {
    setIsModalOpen(false);
    fetchData();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white">Dashboard</h2>
        <button onClick={() => setIsModalOpen(true)} className="bg-primary hover:opacity-90 transition-opacity text-black font-semibold px-4 py-2 rounded-lg inline-flex items-center gap-2">
          <span className="text-lg">+</span>
          Quick Add
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-surface-dark border border-white/5">
          <p className="text-gray-400 text-sm">Total Balance</p>
          <h3 className="text-3xl font-semibold text-white mt-1">${formatCurrency(data.balance)}</h3>
        </div>

        <div className="p-6 rounded-xl bg-surface-dark border border-white/5">
          <p className="text-gray-400 text-sm">Income vs Expenses</p>
          <h3 className="text-3xl font-semibold text-white mt-1">${formatCurrency(data.totalIncome - data.totalExpense)}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-gray-400">This Month</span>
            <span className="text-sm font-medium text-primary">+10%</span>
          </div>
          <div className="flex gap-8 mt-6">
            <div className="flex flex-col items-center">
              <div className="h-32 flex items-end">
                <div className="w-16 bg-primary/40 rounded-t" style={{ height: `${(data.totalIncome / (data.totalIncome + data.totalExpense) * 100) || 0}%` }}></div>
              </div>
              <p className="mt-2 text-xs font-bold uppercase tracking-wider text-gray-400">Income</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-32 flex items-end">
                <div className="w-16 bg-white/10 rounded-t" style={{ height: `${(data.totalExpense / (data.totalIncome + data.totalExpense) * 100) || 0}%` }}></div>
              </div>
              <p className="mt-2 text-xs font-bold uppercase tracking-wider text-gray-400">Expenses</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-bold text-white mb-6">Recent Transactions</h3>
        <div className="rounded-xl bg-surface-dark border border-white/5 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-400">DATE</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-400">DESCRIPTION</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-400">CATEGORY</th>
                <th className="text-right py-3 px-6 text-sm font-medium text-gray-400">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {data.recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-white/5">
                  <td className="py-4 px-6 text-sm text-gray-300">{transaction.date}</td>
                  <td className="py-4 px-6 text-sm text-white">{transaction.description}</td>
                  <td className="py-4 px-6">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#003C2F] text-primary">
                      {transaction.category}
                    </span>
                  </td>
                  <td className={`py-4 px-6 text-sm text-right ${
                    transaction.amount > 0 ? 'text-primary' : 'text-red-500'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(transaction.amount))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TransactionForm onSuccess={handleTransactionAdded} />
      </Modal>
    </div>
  );
};

export default Dashboard;