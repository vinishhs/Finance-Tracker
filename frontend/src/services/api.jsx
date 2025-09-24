import axios from 'axios';
import { getAuthToken, removeAuthToken, removeUserData } from './auth';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  timeout: 10000, // 10 second timeout
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add content type for non-form-data requests
    if (!(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors and token expiration
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle network errors
    if (!error.response) {
      console.error('Network error:', error.message);
      return Promise.reject({
        message: 'Network error. Please check your connection.',
        isNetworkError: true
      });
    }

    const { status, data } = error.response;

    // Handle token expiration or invalid token
    if (status === 401) {
      // Clear auth data
      removeAuthToken();
      removeUserData();
      
      // Redirect to login if not already on auth pages
      if (!window.location.pathname.includes('/login') && 
          !window.location.pathname.includes('/signup') &&
          !window.location.pathname.includes('/verify-email') &&
          !window.location.pathname.includes('/forgot-password')) {
        window.location.href = '/login?session_expired=true';
      }
      
      return Promise.reject({
        message: 'Session expired. Please login again.',
        requiresReauth: true
      });
    }

    // Handle server errors
    if (status >= 500) {
      console.error('Server error:', data);
      return Promise.reject({
        message: 'Server error. Please try again later.',
        isServerError: true
      });
    }

    // Handle client errors with custom messages
    if (status >= 400 && status < 500) {
      return Promise.reject({
        message: data.msg || 'Request failed. Please check your input.',
        details: data,
        isClientError: true
      });
    }

    return Promise.reject(error);
  }
);

// Helper functions for common API operations
export const apiHelper = {
  // GET request with error handling
  get: async (url, config = {}) => {
    try {
      const response = await api.get(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // POST request with error handling
  post: async (url, data, config = {}) => {
    try {
      const response = await api.post(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // PUT request with error handling
  put: async (url, data, config = {}) => {
    try {
      const response = await api.put(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // DELETE request with error handling
  delete: async (url, config = {}) => {
    try {
      const response = await api.delete(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Upload file with progress tracking
  upload: async (url, formData, onProgress = null) => {
    try {
      const response = await api.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(percentCompleted);
          }
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default api;