import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';

const BudgetProgress = ({ progress, className = '' }) => {
  const isOverBudget = progress > 100;
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full ${isOverBudget ? 'bg-red-400' : 'bg-primary'}`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      <span className={`text-xs font-medium ${isOverBudget ? 'text-red-400' : 'text-primary'}`}>
        {progress}%
      </span>
    </div>
  );
};

export default BudgetProgress;