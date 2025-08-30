import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { adminLogin } = useAdmin();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = adminLogin(formData.email, formData.password);
    if (success) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials. Use admin@fruitveg.com / admin123');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <img src="/image.png" alt="Logo" className="h-12 w-12" />
            <div>
              <div className="text-2xl font-bold text-white">Ahmedabad Vegetable & Fruit</div>
              <div className="text-sm text-gray-300">Admin Panel</div>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white">
            Admin Access
          </h2>
          <p className="mt-2 text-gray-300">
            Sign in to access the administrative dashboard
          </p>
        </div>

        <div className="bg-white py-8 px-6 shadow-2xl rounded-lg">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="admin@fruitveg.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="admin123"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-200 font-medium"
            >
              Sign In to Admin Panel
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 mb-2">Demo Credentials:</p>
            <p className="text-xs text-gray-600">
              Email: admin@ahmedabadvegetable.com<br />
              Password: admin123
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm text-green-600 hover:text-green-700"
            >
              ← Back to Customer Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;