import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import Badge from '../common/Badge';
import Card from '../common/Card';

const RecentTransactions = ({ transactions }) => {
  const getCategoryBadgeVariant = (category) => {
    const variants = {
      'Income': 'primary',
      'Food': 'danger',
      'Housing': 'info',
      'Entertainment': 'purple',
      'Transport': 'info',
      'Shopping': 'warning'
    };
    return variants[category] || 'default';
  };

  return (
    <Card className="overflow-hidden p-0">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-white/5">
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">Date</th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">Description</th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-400">Category</th>
            <th className="py-3 px-4 text-right text-sm font-medium text-gray-400">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="border-b border-white/5 hover:bg-white/5">
              <td className="py-3 px-4 text-sm text-gray-300">
                {transaction.date}
              </td>
              <td className="py-3 px-4 text-sm text-gray-300">
                {transaction.description}
              </td>
              <td className="py-3 px-4">
                <Badge variant={getCategoryBadgeVariant(transaction.category)}>
                  {transaction.category}
                </Badge>
              </td>
              <td className={`py-3 px-4 text-sm text-right ${
                transaction.amount > 0 ? 'text-primary' : 'text-red-400'
              }`}>
                {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default RecentTransactions;