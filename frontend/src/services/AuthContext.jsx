import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  setAuthToken, 
  getAuthToken, 
  removeAuthToken, 
  setUserData, 
  getUserData, 
  removeUserData,
  isAuthenticated as checkAuthStatus,
  initializeAuth
} from './auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null for initial loading
  const [loading, setLoading] = useState(true);

  // Initialize authentication on app start
  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      initializeAuth();
      
      const token = getAuthToken();
      const userData = getUserData();
      
      if (token && userData && checkAuthStatus()) {
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        // Clear invalid auth data
        if (token || userData) {
          removeAuthToken();
          removeUserData();
        }
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      removeAuthToken();
      removeUserData();
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = (token, userData) => {
    setAuthToken(token);
    setUserData(userData);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      // Call logout API if needed
      removeAuthToken();
      removeUserData();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
      // Force logout even if API call fails
      removeAuthToken();
      removeUserData();
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const updateUser = (updatedUserData) => {
    const newUserData = { ...user, ...updatedUserData };
    setUserData(newUserData);
    setUser(newUserData);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};