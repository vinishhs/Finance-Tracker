import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Modal from '../components/common/Modal';
import TransactionForm from '../components/Transactions/TransactionForm';
import OverviewCard from '../components/Dashboard/OverviewCard';
import RecentTransactions from '../components/Dashboard/RecentTransactions';
import { formatCurrency } from '../utils/formatCurrency';

const Dashboard = ({ user, logout }) => {
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
    <>
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">Dashboard</h2>
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <OverviewCard title="Total Balance" value={data.balance} />
        <div className="rounded-xl bg-background-light p-6 shadow-sm ring-1 ring-slate-200/50 dark:bg-background-dark dark:ring-slate-800/50 lg:col-span-2">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Income vs Expenses</p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{formatCurrency(data.totalIncome - data.totalExpense)}</p>
              <div className="mt-1 flex items-center gap-1">
                <p className="text-sm text-slate-500 dark:text-slate-400">This Month</p>
                <p className="text-sm font-medium text-green-500">+10%</p>
              </div>
            </div>
          </div>
          <div className="mt-4 grid h-40 grid-cols-2 items-end gap-6 px-3">
            <div className="flex flex-col items-center">
              <div className="w-full rounded-t bg-primary/30 dark:bg-primary/40" style={{ height: `${(data.totalIncome / (data.totalIncome + data.totalExpense) * 100) || 0}%` }}></div>
              <p className="mt-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Income</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-full rounded-t bg-slate-300 dark:bg-slate-700" style={{ height: `${(data.totalExpense / (data.totalIncome + data.totalExpense) * 100) || 0}%` }}></div>
              <p className="mt-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Expenses</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Recent Transactions</h3>
        <RecentTransactions transactions={data.recentTransactions} />
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TransactionForm onSuccess={handleTransactionAdded} />
      </Modal>
    </>
  );
};

export default Dashboard;