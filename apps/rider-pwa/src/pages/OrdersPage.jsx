// apps/rider-pwa/src/pages/OrdersPage.jsx
import { useRiderOrders } from '../hooks/useOrders';
import OrderCard from '../components/OrderCard';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';

const OrdersPage = () => {
  const { orders, loading, error } = useRiderOrders();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded">
        <p>{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return <EmptyState message="You don't have any assigned orders yet." />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      <div>
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;