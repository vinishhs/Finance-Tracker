import api from './api';

// Token management
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
    api.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem('token');
    delete api.defaults.headers.Authorization;
  }
};

export const getAuthToken = () => localStorage.getItem('token');

export const removeAuthToken = () => {
  localStorage.removeItem('token');
  delete api.defaults.headers.Authorization;
};

// User data management
export const setUserData = (user) => {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    localStorage.removeItem('user');
  }
};

export const getUserData = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const removeUserData = () => {
  localStorage.removeItem('user');
};

// Authentication status check
export const isAuthenticated = () => {
  const token = getAuthToken();
  if (!token) return false;

  // Basic token expiration check (optional - more robust check should be done server-side)
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  } catch (error) {
    return false;
  }
};

// Login function
export const loginUser = async (email, password) => {
  const response = await api.post('/api/auth/login', { email, password });
  return response.data;
};

// Google authentication
export const googleAuth = async (googleToken) => {
  const response = await api.post('/api/auth/google-auth', { token: googleToken });
  return response.data;
};

// Signup function
export const signupUser = async (userData) => {
  const response = await api.post('/api/auth/signup', userData);
  return response.data;
};

// Email verification
export const verifyEmail = async (email, code) => {
  const response = await api.post('/api/auth/verify-email', { email, code });
  return response.data;
};

export const resendVerification = async (email) => {
  const response = await api.post('/api/auth/resend-verification', { email });
  return response.data;
};

// Password reset
export const forgotPassword = async (email) => {
  const response = await api.post('/api/auth/forgot-password', { email });
  return response.data;
};

export const resetPassword = async (email, code, newPassword) => {
  const response = await api.post('/api/auth/reset-password', { 
    email, 
    code, 
    newPassword 
  });
  return response.data;
};

// Logout function
export const logoutUser = async () => {
  try {
    // Call logout endpoint if needed (optional)
    await api.post('/api/auth/logout');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // Always clear local storage
    removeAuthToken();
    removeUserData();
  }
};

// Initialize auth token on app start
export const initializeAuth = () => {
  const token = getAuthToken();
  if (token) {
    setAuthToken(token);
  }
};

// Auth interceptor for automatic token refresh (optional - can be enhanced)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      removeAuthToken();
      removeUserData();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);