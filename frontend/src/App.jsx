import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Budgets from './pages/Budgets';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import LoginForm from './components/Auth/LoginForm';
import SignupForm from './components/Auth/SignupForm';
import NotFound from './pages/NotFound';
import Sidebar from './components/Layout/Sidebar';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        // Invalid user data, clear storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-[#002530]">
        {user ? (
          <div className="flex h-screen">
            <Sidebar logout={logout} />
            <div className="flex-1 overflow-hidden">
              <div className="h-full overflow-y-auto px-8 py-8">
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/transactions" element={<Transactions user={user} logout={logout} />} />
                  <Route path="/budgets" element={<Budgets />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-screen flex flex-col">
            <nav className="border-b border-white/5">
              <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center gap-3">
                    <svg className="text-primary w-7 h-7" fill="none" viewBox="0 0 48 48">
                      <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"/>
                    </svg>
                    <span className="text-white text-lg font-bold">Finance Tracker</span>
                  </div>
                  <div className="flex items-center gap-8">
                    <a href="/features" className="text-gray-300 hover:text-white text-sm">Features</a>
                    <a href="/pricing" className="text-gray-300 hover:text-white text-sm">Pricing</a>
                    <a href="/support" className="text-gray-300 hover:text-white text-sm">Support</a>
                  </div>
                </div>
              </div>
            </nav>
            <main className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
              <Routes>
                <Route path="/login" element={<LoginForm login={login} />} />
                <Route path="/signup" element={<SignupForm login={login} />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </Routes>
            </main>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;