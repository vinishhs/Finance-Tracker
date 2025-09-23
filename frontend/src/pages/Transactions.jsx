import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Modal from '../components/common/Modal';
import TransactionForm from '../components/Transactions/TransactionForm';
import TransactionList from '../components/Transactions/TransactionList';
import { formatCurrency } from '../utils/formatCurrency';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';

const Transactions = ({ user, logout }) => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
     const res = await api.get('/api/transactions');
     setTransactions(res.data);
   } catch (err) {
     console.error(err);
   }
 };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
     try {
       await api.delete(`/api/transactions/${id}`);
       fetchTransactions();
     } catch (err) {
       console.error(err);
     }
   }
 };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
    fetchTransactions();
  };

  const filteredTransactions = transactions.filter((t) =>
    t.description.toLowerCase().includes(search.toLowerCase()) ||
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white">Transactions</h2>
        <button onClick={() => setIsModalOpen(true)} className="bg-primary text-white font-semibold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity">
          New Transaction
        </button>
      </div>
      <div className="relative mb-6">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">search</span>
        <input
          className="w-full bg-background-light dark:bg-background-dark border border-primary/20 dark:border-primary/30 rounded-lg py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary focus:outline-none placeholder-gray-500 dark:placeholder-gray-400"
          placeholder="Search transactions..."
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <TransactionList transactions={filteredTransactions} onEdit={handleEdit} onDelete={handleDelete} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TransactionForm onSuccess={handleSuccess} transaction={editingTransaction} />
      </Modal>
    </>
  );
};

export default Transactions;