import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';

const SummaryTable = ({ summary }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-primary/20 dark:border-primary/30">
      <table className="min-w-full divide-y divide-primary/20 dark:divide-primary/30">
        <thead className="bg-primary/10 dark:bg-primary/20">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400" scope="col">Month</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400" scope="col">Income</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400" scope="col">Expense</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400" scope="col">Net</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-primary/10 dark:divide-primary/20 bg-background-light dark:bg-background-dark">
          {Object.entries(summary).map(([month, { income, expense }]) => (
            <tr key={month}>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{month}</td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-green-600">{formatCurrency(income)}</td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-red-600">{formatCurrency(expense)}</td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium" style={{ color: income - expense >= 0 ? 'green' : 'red' }}>
                {formatCurrency(income - expense)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SummaryTable;