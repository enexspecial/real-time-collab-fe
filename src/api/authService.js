import apiClient from './config.js';

/**
 * Authentication API Service
 * Handles user registration and login
 */

export const authService = {
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @param {string} userData.email - User email
   * @param {string} userData.password - User password (min 6 chars)
   * @param {string} userData.name - User full name
   * @returns {Promise<Object>} Auth response with token and user data
   */
  async register(userData) {
    try {
      const response = await apiClient.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  },

  /**
   * Login user
   * @param {Object} credentials - User login credentials
   * @param {string} credentials.email - User email
   * @param {string} credentials.password - User password
   * @returns {Promise<Object>} Auth response with token and user data
   */
  async login(credentials) {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  },

  /**
   * Logout user (client-side)
   * Clears stored tokens and user data
   */
  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  },

  /**
   * Store authentication data
   * @param {Object} authData - Authentication response data
   */
  storeAuthData(authData) {
    localStorage.setItem('accessToken', authData.accessToken);
    localStorage.setItem('user', JSON.stringify(authData.user));
  },

  /**
   * Get stored user data
   * @returns {Object|null} User data or null if not found
   */
  getStoredUser() {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} True if user has valid token
   */
  isAuthenticated() {
    return !!localStorage.getItem('accessToken');
  },

  /**
   * Handle authentication errors
   * @param {Error} error - Axios error
   * @returns {Error} Formatted error with user-friendly message
   */
  handleAuthError(error) {
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          return new Error(data.message || 'Invalid input data');
        case 401:
          return new Error('Invalid email or password');
        case 409:
          return new Error('User already exists with this email');
        default:
          return new Error(data.message || 'Authentication failed');
      }
    }
    
    return new Error('Network error. Please check your connection.');
  }
}; 