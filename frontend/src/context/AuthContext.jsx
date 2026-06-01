import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { apiRequest, getToken, removeToken, setToken } from '../api/client.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadUser() {
    const token = getToken();
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const data = await apiRequest('/auth/me');
      setUser(data);
    } catch {
      removeToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function login(email, password) {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setToken(data.access_token);
    setUser(data.user);
    return data.user;
  }

  async function register(payload) {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  function logout() {
    removeToken();
    setUser(null);
  }

  useEffect(() => {
    loadUser();
  }, []);

  const value = useMemo(
    () => ({ user, loading, isAuthenticated: Boolean(user), login, register, logout }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
