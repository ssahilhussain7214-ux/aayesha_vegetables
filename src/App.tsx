import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import { AdminProvider } from './context/AdminContext';

// Layout Components
import Layout from './components/common/Layout';
import AdminLayout from './components/admin/AdminLayout';

// User Pages
import Login from './pages/user/Login';
import Home from './pages/user/Home';
import ProductDetails from './pages/user/ProductDetails';
import Cart from './pages/user/Cart';
import Checkout from './pages/user/Checkout';
import OrderConfirmation from './pages/user/OrderConfirmation';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import Orders from './pages/admin/Orders';
import OrderDetails from './pages/admin/OrderDetails';
import Inventory from './pages/admin/Inventory';
import Clients from './pages/admin/Clients';
import ClientDetails from './pages/admin/ClientDetails';
import Notifications from './pages/admin/Notifications';
import Analytics from './pages/admin/Analytics';

// Protected Route Components
import { useUser } from './context/UserContext';
import { useAdmin } from './context/AdminContext';

const ProtectedUserRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useUser();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdminAuthenticated } = useAdmin();
  return isAdminAuthenticated ? <>{children}</> : <Navigate to="/admin/login" replace />;
};

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <AdminProvider>
          <Router>
            <Routes>
              {/* User Routes */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route 
                  path="product/:id" 
                  element={
                    <ProtectedUserRoute>
                      <ProductDetails />
                    </ProtectedUserRoute>
                  } 
                />
                <Route 
                  path="cart" 
                  element={
                    <ProtectedUserRoute>
                      <Cart />
                    </ProtectedUserRoute>
                  } 
                />
                <Route 
                  path="checkout" 
                  element={
                    <ProtectedUserRoute>
                      <Checkout />
                    </ProtectedUserRoute>
                  } 
                />
                <Route 
                  path="order-confirmation" 
                  element={
                    <ProtectedUserRoute>
                      <OrderConfirmation />
                    </ProtectedUserRoute>
                  } 
                />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedAdminRoute>
                    <AdminLayout />
                  </ProtectedAdminRoute>
                }
              >
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="orders" element={<Orders />} />
                <Route path="orders/:id" element={<OrderDetails />} />
                <Route path="inventory" element={<Inventory />} />
                <Route path="clients" element={<Clients />} />
                <Route path="clients/:id" element={<ClientDetails />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="analytics" element={<Analytics />} />
              </Route>

              {/* Catch all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </AdminProvider>
      </CartProvider>
    </UserProvider>
  );
}

export default App;