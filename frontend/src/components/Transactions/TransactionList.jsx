import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';

const TransactionList = ({ transactions, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-xl border border-primary/20">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-primary/10 dark:bg-primary/20">
            <th className="p-4 font-semibold text-black">Date</th>
            <th className="p-4 font-semibold text-black">Category</th>
            <th className="p-4 font-semibold text-black">Description</th>
            <th className="p-4 font-semibold text-right text-black">Amount</th>
            <th className="p-4 font-semibold text-center text-black">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-primary/20 dark:divide-primary/30">
          {transactions.map((t) => (
            <tr key={t._id} className={t.type === 'income' ? 'bg-primary/5 dark:bg-primary/10' : ''}>
              <td className="p-4 text-black">{new Date(t.date).toLocaleDateString()}</td>
              <td className="p-4">
                <span className={`bg-${t.type === 'income' ? 'green' : 'red'}-500/10 text-${t.type === 'income' ? 'green' : 'red'}-500 py-1 px-3 rounded-full text-sm`}>{t.category}</span>
              </td>
              <td className="p-4 text-black">{t.description || 'No description'}</td>
              <td className="p-4 text-right font-medium" style={{ color: t.type === 'income' ? 'green' : 'red' }}>
                {t.type === 'income' ? '+' : '-'} {formatCurrency(t.amount)}
              </td>
              <td className="p-4">
                <div className="flex justify-center gap-2">
                  <button onClick={() => onEdit(t)} className="p-2 rounded-lg hover:bg-primary/10">
                    <span className="material-symbols-outlined text-black/70">edit</span>
                  </button>
                  <button onClick={() => onDelete(t._id)} className="p-2 rounded-lg hover:bg-red-500/10">
                    <span className="material-symbols-outlined text-red-500">delete</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;