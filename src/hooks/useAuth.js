import { useState, useEffect } from 'react';
import { authService } from '../api';

export function useAuth() {
  const [user, setUser] = useState(authService.getStoredUser());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setUser(authService.getStoredUser());
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const authData = await authService.login(credentials);
      authService.storeAuthData(authData);
      setUser(authData.user);
      return authData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const authData = await authService.register(userData);
      authService.storeAuthData(authData);
      setUser(authData.user);
      return authData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setError(null);
  };

  const isAuthenticated = () => {
    return authService.isAuthenticated();
  };

  return { 
    user, 
    loading, 
    error, 
    login, 
    register, 
    logout, 
    isAuthenticated 
  };
} 