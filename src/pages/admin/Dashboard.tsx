import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertCircle,
  Eye
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { mockOrders } from '../../data/orders';
import { mockClients } from '../../data/clients';
import { products } from '../../data/products';
import OrderStatusBadge from '../../components/admin/OrderStatusBadge';

const Dashboard: React.FC = () => {
  const { markOrdersAsRead } = useAdmin();
  
  // Calculate stats
  const totalProducts = products.length;
  const totalClients = mockClients.length;
  const totalOrders = mockOrders.length;
  const newOrders = mockOrders.filter(order => order.status === 'New').length;
  const processingOrders = mockOrders.filter(order => order.status === 'Processing').length;
  const deliveredOrders = mockOrders.filter(order => order.status === 'Delivered').length;
  
  const todaysOrders = mockOrders.filter(order => order.date === new Date().toISOString().split('T')[0]).length;

  const recentOrders = mockOrders.slice(0, 5);

  const stats = [
    {
      title: 'Total Products',
      value: totalProducts,
      icon: Package,
      color: 'bg-blue-500',
      change: '+12 this week'
    },
    {
      title: 'Active Clients',
      value: totalClients,
      icon: Users,
      color: 'bg-green-500',
      change: '+3 new clients'
    },
    {
      title: 'Total Orders',
      value: totalOrders,
      icon: ShoppingBag,
      color: 'bg-purple-500',
      change: `${newOrders} new orders`
    },
    {
      title: "Today's Orders",
      value: todaysOrders,
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: '+3 from yesterday'
    }
  ];

  React.useEffect(() => {
    markOrdersAsRead();
  }, [markOrdersAsRead]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-1">
          Welcome back! Here's what's happening with your business today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Order Status Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">New Orders</h3>
            <AlertCircle className="h-5 w-5 text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-blue-600 mb-2">{newOrders}</div>
          <p className="text-sm text-gray-600">Requiring attention</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Processing</h3>
            <Clock className="h-5 w-5 text-yellow-500" />
          </div>
          <div className="text-3xl font-bold text-yellow-600 mb-2">{processingOrders}</div>
          <p className="text-sm text-gray-600">In preparation</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Delivered</h3>
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-green-600 mb-2">{deliveredOrders}</div>
          <p className="text-sm text-gray-600">Successfully completed</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
            <Link
              to="/admin/orders"
              className="text-green-600 hover:text-green-700 font-medium text-sm"
            >
              View All Orders →
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{order.orderNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-900">{order.client.companyName}</div>
                    <div className="text-sm text-gray-500">{order.client.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div>{order.date}</div>
                    <div>{order.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <OrderStatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {order.items.length} items
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={`/admin/orders/${order.id}`}
                      className="text-green-600 hover:text-green-700 flex items-center"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/admin/orders"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900">Manage Orders</h4>
              <p className="text-sm text-gray-600 mt-1">Process and track orders</p>
            </div>
            <ShoppingBag className="h-8 w-8 text-blue-500" />
          </div>
        </Link>

        <Link
          to="/admin/inventory"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900">Manage Inventory</h4>
              <p className="text-sm text-gray-600 mt-1">View and update products</p>
            </div>
            <Package className="h-8 w-8 text-green-500" />
          </div>
        </Link>

        <Link
          to="/admin/clients"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900">Manage Clients</h4>
              <p className="text-sm text-gray-600 mt-1">View client information</p>
            </div>
            <Users className="h-8 w-8 text-purple-500" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;