import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { UserDTO } from '../api/client';

type AuthContextValue = {
  user: UserDTO | null;
  setUser: (user: UserDTO | null) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserDTO | null>(() => {
    const raw = localStorage.getItem('auth_user');
    return raw ? JSON.parse(raw) as UserDTO : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem('auth_user', JSON.stringify(user));
    else localStorage.removeItem('auth_user');
  }, [user]);

  const logout = () => setUser(null);

  const value = useMemo(() => ({ user, setUser, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}


