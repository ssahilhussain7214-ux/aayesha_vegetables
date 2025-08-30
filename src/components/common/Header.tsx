import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useUser } from '../../context/UserContext';

const Header: React.FC = () => {
  const location = useLocation();
  const { getCartItemsCount } = useCart();
  const { user, isAuthenticated, logout } = useUser();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
  const cartItemsCount = getCartItemsCount();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) return null; // Don't show header on admin routes

  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/image.png" alt="Logo" className="h-10 w-10" />
            <span className="text-xl font-bold text-gray-900">Ahmedabad Vegetable & Fruit</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium"
            >
              Home
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/cart"
                  className="relative flex items-center text-gray-700 hover:text-green-600 transition-colors duration-200"
                >
                  <ShoppingCart className="h-5 w-5 mr-1" />
                  Cart
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>
                <div className="flex items-center space-x-2 text-gray-700">
                  <User className="h-5 w-5" />
                  <span className="text-sm">{user?.companyName}</span>
                  <button
                    onClick={logout}
                    className="text-sm text-red-600 hover:text-red-700 ml-2"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
            {!isAuthenticated && (
              <Link
                to="/login"
                className="flex items-center text-gray-700 hover:text-green-600 transition-colors duration-200"
              >
                <User className="h-5 w-5 mr-1" />
                Login
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-green-600"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              {isAuthenticated && (
                <>
                  <Link
                    to="/cart"
                    className="flex items-center text-gray-700 hover:text-green-600 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Cart ({cartItemsCount})
                  </Link>
                  <div className="flex items-center text-gray-700 py-2 border-t border-gray-100">
                    <User className="h-5 w-5 mr-2" />
                    <span className="text-sm">{user?.companyName}</span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="text-left text-red-600 hover:text-red-700"
                  >
                    Logout
                  </button>
                </>
              )}
              {!isAuthenticated && (
                <Link
                  to="/login"
                  className="flex items-center text-gray-700 hover:text-green-600 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5 mr-2" />
                  Login
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;