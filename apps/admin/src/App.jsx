import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Dashboard from './pages/Dashboard';
import OrdersPage from './pages/OrdersPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import RidersPage from './pages/RidersPage';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';
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

  // Check if user is admin
  const isAdmin = user?.role === 'admin';

  return (
    <Routes>
      {/* Login route - accessible only if not logged in */}
      <Route 
        path="/login" 
        element={!user ? <LoginPage /> : <Navigate to="/" />} 
      />
      
      {/* Protected admin routes */}
      <Route path="/" element={isAdmin ? <Layout /> : <Navigate to="/login" />}>
        <Route index element={<Dashboard />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="orders/:id" element={<OrderDetailsPage />} />
        <Route path="riders" element={<RidersPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;