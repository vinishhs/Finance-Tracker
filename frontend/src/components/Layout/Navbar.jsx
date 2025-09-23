import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, logout, toggleTheme, theme }) => {
  return (
    <header className="flex-shrink-0 border-b border-slate-200/50 dark:border-slate-800/50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="text-primary size-7">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"></path>
            </svg>
          </div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">Finance Tracker</h1>
        </div>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link className="text-primary font-bold" to="/dashboard">Dashboard</Link>
          <Link className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white" to="/transactions">Transactions</Link>
          <Link className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white" to="/budgets">Budgets</Link>
          <Link className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white" to="/reports">Reports</Link>
        </nav>
        <div className="flex items-center gap-4">
          <div className="size-10 rounded-full bg-cover bg-center bg-gray-300 flex items-center justify-center text-white font-bold">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <button onClick={logout} className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">Logout</button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
