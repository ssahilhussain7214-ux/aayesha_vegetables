import React, { createContext, useContext, useState } from 'react';

interface AdminContextType {
  isAdminAuthenticated: boolean;
  adminLogin: (email: string, password: string) => boolean;
  adminLogout: () => void;
  newOrdersCount: number;
  markOrdersAsRead: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [newOrdersCount, setNewOrdersCount] = useState(2); // Mock new orders count

  const adminLogin = (email: string, password: string) => {
    // Mock authentication - in real app, this would validate against a backend
    if (email === 'admin@ahmedabadvegetable.com' && password === 'admin123') {
      setIsAdminAuthenticated(true);
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
  };

  const markOrdersAsRead = () => {
    setNewOrdersCount(0);
  };

  const value = {
    isAdminAuthenticated,
    adminLogin,
    adminLogout,
    newOrdersCount,
    markOrdersAsRead,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};