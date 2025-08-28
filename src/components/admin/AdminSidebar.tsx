import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingBag, 
  Bell, 
  BarChart3,
  LogOut,
  Leaf
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const { adminLogout, newOrdersCount } = useAdmin();

  const menuItems = [
    {
      path: '/admin/dashboard',
      icon: LayoutDashboard,
      label: 'Dashboard',
      badge: newOrdersCount > 0 ? newOrdersCount : null
    },
    {
      path: '/admin/orders',
      icon: ShoppingBag,
      label: 'Orders',
      badge: newOrdersCount > 0 ? newOrdersCount : null
    },
    {
      path: '/admin/inventory',
      icon: Package,
      label: 'Inventory'
    },
    {
      path: '/admin/clients',
      icon: Users,
      label: 'Clients'
    },
    {
      path: '/admin/notifications',
      icon: Bell,
      label: 'Notifications',
      badge: newOrdersCount > 0 ? newOrdersCount : null
    },
    {
      path: '/admin/analytics',
      icon: BarChart3,
      label: 'Analytics'
    }
  ];

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <Leaf className="h-8 w-8 text-green-400" />
          <div>
            <div className="font-bold text-lg">FreshVeg Co.</div>
            <div className="text-sm text-gray-400">Admin Panel</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-6">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-green-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="absolute bottom-6 left-4 right-4">
        <button
          onClick={adminLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors duration-200"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;