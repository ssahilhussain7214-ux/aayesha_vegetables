import React from 'react';
import { ShoppingBag, Users, Package } from 'lucide-react';
import { mockOrders } from '../../data/orders';
import { mockClients } from '../../data/clients';
import { products } from '../../data/products';

const Analytics: React.FC = () => {
  // Mock analytics data calculations
  const totalItemsSold = mockOrders.reduce(
    (sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + item.weight, 0),
    0
  ) / 1000; // Convert to kg

  // Mock monthly data for charts (no revenue)
  const monthlyData = [
    { month: 'Jan', orders: 45 },
    { month: 'Feb', orders: 52 },
    { month: 'Mar', orders: 48 },
    { month: 'Apr', orders: 61 },
    { month: 'May', orders: 58 },
    { month: 'Jun', orders: 65 }
  ];

  const topProducts = [
    { name: 'Fresh Tomatoes', sold: '245kg' },
    { name: 'Fresh Apples', sold: '189kg' },
    { name: 'Fresh Carrots', sold: '167kg' },
    { name: 'Green Lettuce', sold: '134kg' },
    { name: 'Fresh Potatoes', sold: '298kg' }
  ];

  const topClients = mockClients
    .sort((a, b) => b.totalOrders - a.totalOrders)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Insights and performance metrics for your business
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-green-600">{mockOrders.length}</p>
              <p className="text-xs text-green-600 mt-1">+12.5% vs last month</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <ShoppingBag className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Clients</p>
              <p className="text-2xl font-bold text-blue-600">{mockClients.length}</p>
              <p className="text-xs text-blue-600 mt-1">+8.2% vs last month</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Products Available</p>
              <p className="text-2xl font-bold text-purple-600">{products.length}</p>
              <p className="text-xs text-purple-600 mt-1">+3.8% vs last month</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Package className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Items Sold</p>
              <p className="text-2xl font-bold text-orange-600">{totalItemsSold.toFixed(0)}kg</p>
              <p className="text-xs text-orange-600 mt-1">+15.3% vs last month</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Package className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Orders Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Monthly Orders Trend</h2>
          <div className="space-y-4">
            {monthlyData.map((data) => (
              <div key={data.month} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 text-sm font-medium text-gray-600">{data.month}</div>
                  <div className="flex-1">
                    <div className="bg-gray-200 rounded-full h-4 w-32">
                      <div
                        className="bg-green-600 h-4 rounded-full transition-all duration-500"
                        style={{ width: `${(data.orders / 70) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">{data.orders} orders</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Top Selling Products</h2>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-600">{product.sold} sold</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Clients */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Top Clients</h2>
          <div className="space-y-4">
            {topClients.map((client, index) => (
              <div key={client.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{client.companyName}</div>
                    <div className="text-sm text-gray-600">{client.email}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">{client.totalOrders} orders</div>
                  <div className="text-sm text-gray-600">
                    Since {new Date(client.registrationDate).toLocaleDateString('en-GB')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Performance */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Category Performance</h2>
          <div className="space-y-4">
            {['Fruits', 'Vegetables', 'English Vegetables'].map((category) => {
              const categoryProducts = products.filter(p => p.category === category);
              const percentage = (categoryProducts.length / products.length) * 100;

              return (
                <div key={category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">{category}</span>
                   
