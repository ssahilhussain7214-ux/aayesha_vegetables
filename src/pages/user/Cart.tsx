import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Trash2 } from 'lucide-react';
import CartItem from '../../components/user/CartItem';
import { useCart } from '../../context/CartContext';
import { useUser } from '../../context/UserContext';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart, getCartTotal, getCartItemsCount } = useCart();
  const { isAuthenticated } = useUser();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const cartTotal = getCartTotal();
  const cartItemsCount = getCartItemsCount();

  if (!isAuthenticated) {
    return null;
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">
            Add some fresh produce to your cart to get started.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-1">
            {cartItemsCount} {cartItemsCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
        <Link
          to="/"
          className="flex items-center text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Continue Shopping
        </Link>
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>

          {/* Clear Cart Button */}
          <div className="mt-6">
            <button
              onClick={clearCart}
              className="flex items-center text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Clear Cart
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="mt-8 lg:mt-0">
          <div className="bg-white p-6 rounded-lg shadow-lg sticky top-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4">
              {cartItems.map((item) => {
                const itemTotal = item.product.pricePerKg * (item.weight / 1000);
                return (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <div className="flex-1 truncate mr-2">
                      <div className="font-medium text-gray-900">{item.product.name}</div>
                      <div className="text-gray-500">{item.weight}g</div>
                    </div>
                    <div className="font-medium text-gray-900">
                      £{itemTotal.toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-gray-200 pt-4 mt-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-green-600">
                  £{cartTotal.toFixed(2)}
                </span>
              </div>
              
              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200 font-medium"
              >
                Proceed to Checkout
              </button>
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                Minimum order value: £10.00
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;