import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const categories = {
  expense: {
    'Housing': [
      'Rent / Mortgage',
      'Property Taxes',
      'Home Insurance',
      'Utilities (Electricity, Water, Gas)',
      'Maintenance & Repairs'
    ],
    'Transportation': [
      'Fuel / Gas',
      'Public Transport (Bus, Train, Metro)',
      'Vehicle Maintenance & Repairs',
      'Car Insurance',
      'Parking / Tolls / Ride-hailing'
    ],
    'Food & Groceries': [
      'Groceries',
      'Dining Out / Restaurants',
      'Coffee / Snacks',
      'Meal Delivery Services'
    ],
    'Health & Fitness': [
      'Medical Bills / Doctor Visits',
      'Health Insurance',
      'Medicines / Pharmacy',
      'Gym / Fitness Memberships'
    ],
    'Entertainment & Leisure': [
      'Movies, Music, Books',
      'Hobbies & Games',
      'Subscriptions (Netflix, Spotify, etc.)',
      'Travel & Vacations'
    ],
    'Education & Learning': [
      'Tuition / Courses',
      'Books & Study Material',
      'Workshops & Seminars'
    ],
    'Personal Care': [
      'Haircuts / Salon',
      'Skincare / Cosmetics',
      'Personal Hygiene'
    ],
    'Financial & Insurance': [
      'Loan Payments',
      'Credit Card Payments',
      'Life / Health / Vehicle Insurance',
      'Investments & Savings'
    ],
    'Miscellaneous': [
      'Gifts / Donations',
      'Pet Care',
      'Unexpected Expenses'
    ]
  },
  income: {
    'Employment': [
      'Regular Salary',
      'Overtime Pay',
      'Bonuses / Incentives',
      'Commissions'
    ],
    'Business / Self-Employment': [
      'Freelance Income',
      'Consulting Fees',
      'Business Profits',
      'Project Payments'
    ],
    'Investments': [
      'Dividends',
      'Interest from Bank / Bonds',
      'Capital Gains (Selling Stocks, Assets)',
      'Rental Income'
    ],
    'Gifts / Handouts': [
      'Family Gifts / Money',
      'Cash from Friends',
      'Inheritances'
    ],
    'Government / Benefits': [
      'Pensions',
      'Unemployment Benefits',
      'Scholarships / Grants',
      'Tax Refunds'
    ],
    'Miscellaneous / Other Credits': [
      'Refunds / Rebates',
      'Sale of Personal Items',
      'Loyalty / Reward Points Converted to Cash'
    ]
  }
};

const TransactionForm = ({ onSuccess, transaction = null }) => {
  const [type, setType] = useState(transaction ? transaction.type : 'expense');
  const [amount, setAmount] = useState(transaction ? transaction.amount : '');
  const [mainCategory, setMainCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [description, setDescription] = useState(transaction ? transaction.description : '');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (transaction && transaction.category) {
      const [main, sub] = transaction.category.split(' - ');
      setMainCategory(main);
      setSubCategory(sub || '');
    }
  }, [transaction]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const categoryString = subCategory ? `${mainCategory} - ${subCategory}` : mainCategory;
      const payload = { 
        type, 
        amount: parseFloat(amount), 
        category: categoryString,
        description 
      };
      
      if (transaction) {
        await api.put(`/api/transactions/${transaction._id}`, payload);
      } else {
        await api.post('/api/transactions', payload);
      }
      onSuccess();
      navigate('/transactions');
    } catch (err) {
      setError(err.response?.data.msg || 'Error saving transaction');
    }
  };

  // Reset subcategory when main category or type changes
  useEffect(() => {
    setSubCategory('');
  }, [mainCategory, type]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-bold text-black dark:text-white">{transaction ? 'Edit' : 'Add'} Transaction</h3>
      {error && <p className="text-red-500">{error}</p>}
      
      <div className="grid grid-cols-2 gap-4">
        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            setMainCategory('');
            setSubCategory('');
          }}
          className="w-full p-2 border border-primary/20 dark:border-primary/30 rounded bg-background-light dark:bg-background-dark text-black dark:text-white focus:ring-primary focus:border-primary"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          required
          className="w-full p-2 border border-primary/20 dark:border-primary/30 rounded bg-background-light dark:bg-background-dark text-black dark:text-white focus:ring-primary focus:border-primary"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <select
          value={mainCategory}
          onChange={(e) => setMainCategory(e.target.value)}
          required
          className="w-full p-2 border border-primary/20 dark:border-primary/30 rounded bg-background-light dark:bg-background-dark text-black dark:text-white focus:ring-primary focus:border-primary"
        >
          <option value="">Select Category</option>
          {Object.keys(categories[type]).map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          required
          className="w-full p-2 border border-primary/20 dark:border-primary/30 rounded bg-background-light dark:bg-background-dark text-black dark:text-white focus:ring-primary focus:border-primary"
        >
          <option value="">Select Subcategory</option>
          {mainCategory && categories[type][mainCategory].map((subCat) => (
            <option key={subCat} value={subCat}>{subCat}</option>
          ))}
        </select>
      </div>

      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full p-2 border border-primary/20 dark:border-primary/30 rounded bg-background-light dark:bg-background-dark text-black dark:text-white focus:ring-primary focus:border-primary"
      />
      <button type="submit" className="px-4 py-2 bg-primary text-black rounded font-bold hover:opacity-90 transition-opacity">Save</button>
    </form>
  );
};

export default TransactionForm;