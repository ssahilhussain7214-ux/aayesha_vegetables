import React from 'react';
import { Bell, User } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const AdminHeader: React.FC = () => {
  const { newOrdersCount } = useAdmin();
  const currentDate = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">{currentDate}</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <Bell className="h-6 w-6" />
              {newOrdersCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {newOrdersCount}
                </span>
              )}
            </button>
          </div>

          {/* Admin User */}
          <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
            <User className="h-5 w-5 text-gray-600" />
            <span className="text-gray-900 font-medium">Admin User</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;