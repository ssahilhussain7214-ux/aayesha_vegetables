import React, { useState } from 'react';
import { Bell, Package, Users, AlertCircle, CheckCircle, Clock, Trash2 } from 'lucide-react';

interface Notification {
  id: string;
  type: 'order' | 'client' | 'system' | 'inventory';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'n1',
      type: 'order',
      title: 'New Order Received',
      message: 'Fresh Market Co. placed a new order (#FV2025001) worth £13.75',
      time: '2 minutes ago',
      read: false
    },
    {
      id: 'n2',
      type: 'order',
      title: 'Order Ready for Delivery',
      message: 'Order #FV2025003 for Organic Supplies Inc. is ready for delivery',
      time: '15 minutes ago',
      read: false
    },
    {
      id: 'n3',
      type: 'client',
      title: 'New Client Registration',
      message: 'Healthy Foods Ltd. has registered as a new client',
      time: '1 hour ago',
      read: true
    },
    {
      id: 'n4',
      type: 'system',
      title: 'Daily Report Ready',
      message: 'Your daily sales report for January 15, 2025 is now available',
      time: '2 hours ago',
      read: true
    },
    {
      id: 'n5',
      type: 'inventory',
      title: 'Low Stock Alert',
      message: 'Fresh Strawberries inventory is running low (5kg remaining)',
      time: '3 hours ago',
      read: true
    }
  ]);

  const [filter, setFilter] = useState<string>('all');

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read;
    if (filter === 'read') return notification.read;
    if (filter !== 'all') return notification.type === filter;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return Package;
      case 'client':
        return Users;
      case 'system':
        return Bell;
      case 'inventory':
        return AlertCircle;
      default:
        return Bell;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'order':
        return 'text-blue-500';
      case 'client':
        return 'text-green-500';
      case 'system':
        return 'text-purple-500';
      case 'inventory':
        return 'text-orange-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-1">
            {unreadCount} unread notifications
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Mark All Read
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { key: 'all', label: 'All Notifications', count: notifications.length },
              { key: 'unread', label: 'Unread', count: unreadCount },
              { key: 'order', label: 'Orders', count: notifications.filter(n => n.type === 'order').length },
              { key: 'client', label: 'Clients', count: notifications.filter(n => n.type === 'client').length },
              { key: 'system', label: 'System', count: notifications.filter(n => n.type === 'system').length }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  filter === tab.key
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </nav>
        </div>

        {/* Notifications List */}
        <div className="p-6">
          {filteredNotifications.length > 0 ? (
            <div className="space-y-4">
              {filteredNotifications.map((notification) => {
                const Icon = getNotificationIcon(notification.type);
                return (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border transition-all duration-200 ${
                      notification.read
                        ? 'bg-white border-gray-200'
                        : 'bg-blue-50 border-blue-200'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className={`p-2 rounded-lg ${notification.read ? 'bg-gray-100' : 'bg-blue-100'}`}>
                          <Icon className={`h-5 w-5 ${getNotificationColor(notification.type)}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className={`font-semibold ${notification.read ? 'text-gray-900' : 'text-gray-900'}`}>
                              {notification.title}
                            </h4>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm mb-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center space-x-4">
                            <span className="text-xs text-gray-500">{notification.time}</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              notification.type === 'order' ? 'bg-blue-100 text-blue-700' :
                              notification.type === 'client' ? 'bg-green-100 text-green-700' :
                              notification.type === 'system' ? 'bg-purple-100 text-purple-700' :
                              'bg-orange-100 text-orange-700'
                            }`}>
                              {notification.type}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-green-600 hover:text-green-700 p-1"
                            title="Mark as read"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="text-red-600 hover:text-red-700 p-1"
                          title="Delete notification"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <div className="text-gray-500 text-lg">No notifications found</div>
              <p className="text-gray-400 text-sm">Try changing the filter above</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;