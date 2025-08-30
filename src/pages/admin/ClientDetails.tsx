import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, ShoppingBag, Eye } from 'lucide-react';
import { mockClients } from '../../data/clients';
import OrderStatusBadge from '../../components/admin/OrderStatusBadge';

const ClientDetails: React.FC = () => {
  const { id } = useParams();
  const client = mockClients.find(c => c.id === id);

  if (!client) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Client not found</h1>
          <Link
            to="/admin/clients"
            className="text-green-600 hover:text-green-700 font-medium"
          >
            Back to Clients
          </Link>
        </div>
      </div>
    );
  }

  const totalSpent = client.orderHistory.reduce((sum, order) => sum + order.totalAmount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center">
        <Link
          to="/admin/clients"
          className="flex items-center text-gray-600 hover:text-gray-900 mr-6 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Clients
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{client.companyName}</h1>
          <p className="text-gray-600 mt-1">Client Details & Order History</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Client Information */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <Mail className="h-4 w-4 mr-3 text-gray-400" />
                <a href={`mailto:${client.email}`} className="hover:text-green-600">
                  {client.email}
                </a>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="h-4 w-4 mr-3 text-gray-400" />
                <a href={`tel:${client.phone}`} className="hover:text-green-600">
                  {client.phone}
                </a>
              </div>
              <div className="flex items-start text-gray-600">
                <MapPin className="h-4 w-4 mr-3 text-gray-400 mt-1 flex-shrink-0" />
                <span>{client.address}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="h-4 w-4 mr-3 text-gray-400" />
                <span>Member since {new Date(client.registrationDate).toLocaleDateString('en-GB')}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Statistics</h2>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{client.totalOrders}</div>
                <div className="text-sm text-gray-600">Total Orders</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">£{totalSpent.toFixed(2)}</div>
                <div className="text-sm text-gray-600">Total Spent</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  £{client.totalOrders > 0 ? (totalSpent / client.totalOrders).toFixed(2) : '0.00'}
                </div>
                <div className="text-sm text-gray-600">Average Order Value</div>
              </div>
            </div>
          </div>
        </div>

        {/* Order History */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Order History ({client.orderHistory.length} orders)
              </h2>
            </div>

            {client.orderHistory.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Items
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
                    {client.orderHistory.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{order.orderNumber}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          <div>{order.date}</div>
                          <div>{order.time}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <div>{order.items.length} items</div>
                          <div className="text-xs text-gray-500">
                            {order.items.map(item => item.productName).slice(0, 2).join(', ')}
                            {order.items.length > 2 && '...'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <OrderStatusBadge status={order.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                          £{order.totalAmount.toFixed(2)}
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
            ) : (
              <div className="p-12 text-center">
                <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <div className="text-gray-500 text-lg">No orders yet</div>
                <p className="text-gray-400 text-sm">This client hasn't placed any orders.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;