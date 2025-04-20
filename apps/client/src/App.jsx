import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="product/:id" element={<ProductPage />} />
        <Route path="cart" element={<CartPage />} />
        
        {/* Protected routes */}
        <Route 
          path="checkout" 
          element={user ? <CheckoutPage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="profile" 
          element={user ? <ProfilePage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="orders" 
          element={user ? <OrdersPage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="order/:id" 
          element={user ? <OrderDetailsPage /> : <Navigate to="/login" />} 
        />
        
        {/* Auth routes */}
        <Route path="login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
        
        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;