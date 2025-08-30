import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Package, Calendar, MapPin, ArrowRight } from 'lucide-react';

const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const orderData = location.state?.orderData;

  if (!orderData) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Order not found</h1>
          <Link
            to="/"
            className="text-green-600 hover:text-green-700 font-medium"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const deliveryDate = new Date(new Date().getTime() + (24 * 60 * 60 * 1000));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Success Header */}
      <div className="text-center mb-8">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-lg text-gray-600">
          Thank you for your order. We'll prepare it with care and deliver it fresh.
        </p>
      </div>

      {/* Order Details Card */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
        <div className="bg-green-50 px-6 py-4 border-b border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Order #{orderData.orderNumber}
              </h2>
              <p className="text-gray-600">
                Placed on {orderData.date} at {orderData.time}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">
                Order Placed Successfully
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Delivery Information */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-gray-600" />
                Delivery Information
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div>
                  <span className="font-medium text-gray-900">{orderData.client.companyName}</span>
                </div>
                <div className="text-gray-600">{orderData.client.address}</div>
                <div className="flex items-center text-green-600 font-medium">
                  <Calendar className="h-4 w-4 mr-1" />
                  Expected: {deliveryDate.toLocaleDateString('en-GB')}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="text-gray-600">{orderData.client.email}</div>
                <div className="text-gray-600">{orderData.client.phone}</div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Package className="h-5 w-5 mr-2 text-gray-600" />
              Order Items
            </h3>
            <div className="space-y-3">
              {orderData.items.map((item: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{item.productName}</div>
                    <div className="text-sm text-gray-600">
                      {item.weight}g
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-blue-50 rounded-lg p-6 mb-8">
        <h3 className="font-semibold text-gray-900 mb-4">What happens next?</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
              1
            </div>
            <div>
              <div className="font-medium text-gray-900">Order Processing</div>
              <div className="text-gray-600 text-sm">
                We'll carefully select and pack your fresh produce
              </div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
              2
            </div>
            <div>
              <div className="font-medium text-gray-900">Quality Check</div>
              <div className="text-gray-600 text-sm">
                Every item is inspected to ensure it meets our quality standards
              </div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
              3
            </div>
            <div>
              <div className="font-medium text-gray-900">Delivery</div>
              <div className="text-gray-600 text-sm">
                Your order will be delivered fresh on {deliveryDate.toLocaleDateString('en-GB')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
        >
          Continue Shopping
          <ArrowRight className="h-5 w-5 ml-2" />
        </Link>
      </div>

      {/* Support Information */}
      <div className="mt-8 text-center text-gray-600">
        <p className="mb-2">Need help with your order?</p>
        <div className="space-x-6">
          <span>📧 support@ahmedabadvegetable.com</span>
          <span>📞 +91 79 1234 5678</span>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;