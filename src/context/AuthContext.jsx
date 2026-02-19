import { createContext, useContext, useState, useEffect } from 'react';
import {
  getToken,
  getUserData,
  logout as authLogout,
  isAuthenticated as checkAuth
} from '../services/authService';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const initAuth = () => {
      const savedToken = getToken();
      const savedUser = getUserData();

      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(savedUser);
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = (tokenData, userData) => {
    setToken(tokenData);
    setUser(userData);
  };

  const logout = () => {
    authLogout();
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = () => {
    return checkAuth();
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
