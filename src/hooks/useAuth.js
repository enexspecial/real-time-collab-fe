import { useState, useEffect } from 'react';
import { getUserFromToken, removeToken } from '../utils/auth';

export function useAuth() {
  const [user, setUser] = useState(getUserFromToken());

  useEffect(() => {
    setUser(getUserFromToken());
  }, []);

  function logout() {
    removeToken();
    setUser(null);
  }

  return { user, logout };
} 