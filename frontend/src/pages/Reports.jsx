import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import ChartComponent from '../components/Reports/ChartComponent';
import SummaryTable from '../components/Reports/SummaryTable';

const Reports = ({ user, logout }) => {
  const [summary, setSummary] = useState({
    monthlySummary: [
      { month: 'January', income: 4200, expenses: 2500, savings: 1700 },
      { month: 'February', income: 4000, expenses: 2800, savings: 1200 },
      { month: 'March', income: 4300, expenses: 2500, savings: 1800 }
    ]
  });
  const [period, setPeriod] = useState('Last 30 Days');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await api.get('/api/reports');
      // setSummary(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Reports</h1>
      </div>
      <div className="flex items-center gap-4">
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="bg-white text-black font-medium text-sm rounded-lg px-4 py-2 border border-white/10 focus:outline-none focus:border-primary"
        >
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
          <option>Last Year</option>
          <option>All Time</option>
        </select>
        <div className="flex items-center gap-2">
          <button className="bg-surface-dark hover:bg-white/5 text-sm text-gray-300 px-4 py-2 rounded-lg border border-white/10 flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M3 16v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4M17 8l-5-5-5 5M12 3v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Download PDF
          </button>
          <button className="bg-surface-dark hover:bg-white/5 text-sm text-gray-300 px-4 py-2 rounded-lg border border-white/10 flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M3 16v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4M17 8l-5-5-5 5M12 3v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Download CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income vs. Expenses Chart */}
        <div className="p-6 rounded-2xl bg-surface-dark">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-lg font-medium text-white">Income vs. Expenses</h2>
              <div className="mt-1 flex items-center text-sm">
                <span className="text-gray-400">Last 30 days</span>
                <span className="ml-2 text-primary">+5%</span>
              </div>
            </div>
            <div className="text-2xl font-semibold text-white">
              +$12,500
            </div>
          </div>
          <div className="h-64">
            <ChartComponent type="line" height={256} />
          </div>
        </div>

        {/* Category Breakdown Chart */}
        <div className="p-6 rounded-2xl bg-surface-dark">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-lg font-medium text-white">Category Breakdown</h2>
              <div className="mt-1 flex items-center text-sm">
                <span className="text-gray-400">Top spending categories</span>
                <span className="ml-2 text-red-400">-3%</span>
              </div>
            </div>
            <div className="text-2xl font-semibold text-white">
              +$7,800
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 rounded bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="text-sm text-gray-300">Food</span>
              </div>
              <span className="text-sm text-gray-400">35%</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm text-gray-300">Rent</span>
              </div>
              <span className="text-sm text-gray-400">25%</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-sm text-gray-300">Utilities</span>
              </div>
              <span className="text-sm text-gray-400">20%</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-sm text-gray-300">Entertainment</span>
              </div>
              <span className="text-sm text-gray-400">20%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Summary Table */}
      <div className="rounded-xl bg-surface-dark overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5">
          <h2 className="text-lg font-medium text-white">Monthly Summary</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Month</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Income</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Expenses</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Savings</th>
              </tr>
            </thead>
            <tbody>
              {summary.monthlySummary.map((month, index) => (
                <tr key={index} className="border-b border-white/5 hover:bg-white/5">
                  <td className="px-6 py-4 text-sm text-gray-300">{month.month}</td>
                  <td className="px-6 py-4 text-sm text-primary">+${month.income.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-red-400">-${month.expenses.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">${month.savings.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Reports;