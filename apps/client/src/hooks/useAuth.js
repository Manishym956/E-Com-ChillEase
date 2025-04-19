// apps/client/src/hooks/useAuth.js
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

/**
 * Custom hook for accessing authentication context
 * @returns {{
 *   user: Object|null,
 *   loading: boolean,
 *   login: (credential: string) => Promise<boolean>,
 *   logout: () => void
 * }} Authentication context containing user state and auth methods
 * @throws {Error} If used outside of AuthProvider
 * 
 * @example
 * const { user, loading, login, logout } = useAuth();
 */
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}
