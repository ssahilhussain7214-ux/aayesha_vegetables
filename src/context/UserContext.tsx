import React, { createContext, useContext, useState } from 'react';
import { User } from '../types';

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: Omit<User, 'id'>) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: Omit<User, 'id'>) => {
    const newUser: User = {
      id: `user-${Date.now()}`, // Mock ID generation
      ...userData,
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};