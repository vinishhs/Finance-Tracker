import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import Card from '../common/Card';

const OverviewCard = ({ title, value, change, period }) => {
  return (
    <Card>
      <h2 className="text-sm font-medium text-gray-400">{title}</h2>
      <div className="mt-2">
        <span className="text-3xl font-semibold text-white">
          ${formatCurrency(value)}
        </span>
        {change && period && (
          <div className="mt-1 flex items-center text-sm">
            <span className="text-gray-400">{period}</span>
            <span className={`ml-2 ${change >= 0 ? 'text-primary' : 'text-red-400'}`}>
              {change >= 0 ? '+' : ''}{change}%
            </span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default OverviewCard;