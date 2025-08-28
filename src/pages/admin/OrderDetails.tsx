import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, Printer, MapPin, Mail, Phone, Package } from 'lucide-react';
import { mockOrders } from '../../data/orders';
import OrderStatusBadge from '../../components/admin/OrderStatusBadge';

const OrderDetails: React.FC = () => {
  const { id } = useParams();
  const order = mockOrders.find(o => o.id === id);

  if (!order) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Order not found</h1>
          <Link
            to="/admin/orders"
            className="text-green-600 hover:text-green-700 font-medium"
          >
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    // Mock print action
    alert('Print functionality would be implemented here');
  };

  const handleExportPDF = () => {
    // Mock PDF export action
    alert('PDF export functionality would be implemented here');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link
            to="/admin/orders"
            className="flex items-center text-gray-600 hover:text-gray-900 mr-6 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Orders
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Order #{order.orderNumber}
            </h1>
            <p className="text-gray-600 mt-1">
              Placed on {order.date} at {order.time}
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handlePrint}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center"
          >
            <Printer className="h-4 w-4 mr-2" />
            Print
          </button>
          <button
            onClick={handleExportPDF}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center"
          >
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Status */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Order Status</h2>
              <OrderStatusBadge status={order.status} />
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-2">
                £{order.totalAmount.toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">
                {order.items.length} items • Total weight: {order.items.reduce((sum, item) => sum + item.weight, 0)}g
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Package className="h-5 w-5 mr-2" />
              Order Items
            </h2>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{item.productName}</div>
                    <div className="text-sm text-gray-600">
                      {item.weight}g × £{item.pricePerKg.toFixed(2)}/kg
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">
                      £{item.total.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Client Information */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Client Information</h2>
            <div className="space-y-4">
              <div>
                <div className="font-medium text-gray-900 mb-1">
                  {order.client.companyName}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  <a href={`mailto:${order.client.email}`} className="hover:text-green-600">
                    {order.client.email}
                  </a>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  <a href={`tel:${order.client.phone}`} className="hover:text-green-600">
                    {order.client.phone}
                  </a>
                </div>
                <div className="flex items-start text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                  <div>{order.client.address}</div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <Link
                  to={`/admin/clients/${order.client.companyName.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-green-600 hover:text-green-700 font-medium text-sm"
                >
                  View Client Profile →
                </Link>
              </div>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Timeline</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div>
                  <div className="font-medium text-gray-900">Order Placed</div>
                  <div className="text-sm text-gray-600">{order.date} at {order.time}</div>
                </div>
              </div>
              
              {order.status !== 'New' && (
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div>
                    <div className="font-medium text-gray-900">Processing Started</div>
                    <div className="text-sm text-gray-600">Today at 09:15</div>
                  </div>
                </div>
              )}
              
              {order.status === 'Delivered' && (
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <div className="font-medium text-gray-900">Delivered</div>
                    <div className="text-sm text-gray-600">Today at 14:30</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {order.status === 'New' && (
                <button className="w-full bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors duration-200">
                  Mark as Processing
                </button>
              )}
              {order.status === 'Processing' && (
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200">
                  Mark as Delivered
                </button>
              )}
              <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                Send Update Email
              </button>
              <button className="w-full border border-red-300 text-red-700 py-2 px-4 rounded-lg hover:bg-red-50 transition-colors duration-200">
                Cancel Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;