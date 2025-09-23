import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = ({ logout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  return (
    <aside className="w-64 bg-surface-dark flex flex-col min-h-screen">
      <div className="p-6 flex items-center gap-3">
        <svg className="text-primary w-7 h-7" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"/>
        </svg>
        <h1 className="text-lg font-bold text-white">Finance Tracker</h1>
      </div>
      <nav className="flex-grow px-4 pt-6">
        <ul className="space-y-2">
          <li>
            <Link 
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg ${
                location.pathname === '/dashboard' 
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-gray-300 hover:bg-white/5'
              }`} 
              to="/dashboard"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5zm10 0a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5zM4 16a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3zm10-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-6z" fill="currentColor"/>
              </svg>
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link 
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg ${
                location.pathname === '/transactions' 
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-gray-300 hover:bg-white/5'
              }`} 
              to="/transactions"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6zm2 0v12h14V6H5zm2 3a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1zm0 4a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1zm0 4a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1z" fill="currentColor"/>
              </svg>
              <span>Transactions</span>
            </Link>
          </li>
          <li>
            <Link 
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg ${
                location.pathname === '/budgets' 
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-gray-300 hover:bg-white/5'
              }`} 
              to="/budgets"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16.001A8 8 0 0 0 12 20zm-5-8h10v2H7v-2z" fill="currentColor"/>
              </svg>
              <span>Budgets</span>
            </Link>
          </li>
          <li>
            <Link 
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg ${
                location.pathname === '/reports' 
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-gray-300 hover:bg-white/5'
              }`} 
              to="/reports"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12h4l3-9 4 18 3-9h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Reports</span>
            </Link>
          </li>
          <li>
            <Link 
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg ${
                location.pathname === '/settings' 
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-gray-300 hover:bg-white/5'
              }`} 
              to="/settings"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" fill="currentColor"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M13.663 4.749A8.97 8.97 0 0 0 12 4.5c-.563 0-1.115.057-1.647.167l-.242-.699a1.5 1.5 0 0 0-1.852-.958l-.789.272a1.5 1.5 0 0 0-.959 1.852l.242.7a9.015 9.015 0 0 0-2.82 2.82l-.699-.242a1.5 1.5 0 0 0-1.852.959l-.272.788a1.5 1.5 0 0 0 .959 1.852l.699.242A8.97 8.97 0 0 0 4.5 12c0 .563.057 1.115.167 1.647l-.699.242a1.5 1.5 0 0 0-.958 1.852l.272.789a1.5 1.5 0 0 0 1.852.959l.7-.242a9.015 9.015 0 0 0 2.82 2.82l-.242.699a1.5 1.5 0 0 0 .959 1.852l.788.272a1.5 1.5 0 0 0 1.852-.959l.242-.699A8.97 8.97 0 0 0 12 19.5c.563 0 1.115-.057 1.647-.167l.242.699a1.5 1.5 0 0 0 1.852.958l.789-.272a1.5 1.5 0 0 0 .959-1.852l-.242-.7a9.015 9.015 0 0 0 2.82-2.82l.699.242a1.5 1.5 0 0 0 1.852-.959l.272-.788a1.5 1.5 0 0 0-.959-1.852l-.699-.242A8.97 8.97 0 0 0 19.5 12c0-.563-.057-1.115-.167-1.647l.699-.242a1.5 1.5 0 0 0 .958-1.852l-.272-.789a1.5 1.5 0 0 0-1.852-.959l-.7.242a9.015 9.015 0 0 0-2.82-2.82l.242-.699a1.5 1.5 0 0 0-.959-1.852l-.788-.272a1.5 1.5 0 0 0-1.852.959l-.242.699zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" fill="currentColor"/>
              </svg>
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-300 hover:bg-white/5 transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;