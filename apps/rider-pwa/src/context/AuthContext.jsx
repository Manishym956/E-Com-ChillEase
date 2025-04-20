import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  // Fetch user profile from API
  const fetchUserProfile = async () => {
    try {
      const { data } = await api.get('/users/profile');
      
      // Only allow rider users
      if (data.role !== 'rider') {
        localStorage.removeItem('token');
        setUser(null);
      } else {
        setUser(data);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  // Handle Google login
  const login = async (credential) => {
    try {
      const { data } = await api.post('/auth/google', { token: credential });
      
      // Only allow rider users
      if (data.role !== 'rider') {
        throw new Error('Unauthorized. Rider access only.');
      }
      
      localStorage.setItem('token', credential);
      setUser(data);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  // Handle logout
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;