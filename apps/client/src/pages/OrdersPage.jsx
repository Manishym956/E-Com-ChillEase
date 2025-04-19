// apps/client/src/pages/OrdersPage.jsx
import { Link } from 'react-router-dom';
import { FiChevronRight, FiPackage } from 'react-icons/fi';
import { useOrders } from '../hooks/useOrders';

const OrdersPage = () => {
  const { orders, loading, error } = useOrders();

  // Function to get appropriate status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'bg-yellow-100 text-yellow-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Undelivered':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <div className="flex justify-center mb-4">
            <FiPackage className="w-16 h-16 text-gray-400" />
          </div>
          <h2 className="text-xl font-medium text-gray-900 mb-2">No orders yet</h2>
          <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
          <Link to="/" className="btn-primary">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="hidden md:grid md:grid-cols-12 p-4 border-b bg-gray-50 text-sm font-medium text-gray-500">
            <div className="md:col-span-2">Order ID</div>
            <div className="md:col-span-2">Date</div>
            <div className="md:col-span-2">Total</div>
            <div className="md:col-span-2">Status</div>
            <div className="md:col-span-4 text-right">Actions</div>
          </div>

          {orders.map((order) => (
            <div 
              key={order._id}
              className="p-4 border-b last:border-0 grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
            >
              {/* Order ID */}
              <div className="md:col-span-2">
                <div className="md:hidden text-sm font-medium text-gray-500 mb-1">Order ID:</div>
                <div className="font-medium text-gray-900">
                  #{order._id.substring(order._id.length - 6)}
                </div>
              </div>

              {/* Date */}
              <div className="md:col-span-2">
                <div className="md:hidden text-sm font-medium text-gray-500 mb-1">Date:</div>
                <div>{formatDate(order.createdAt)}</div>
              </div>

              {/* Total */}
              <div className="md:col-span-2">
                <div className="md:hidden text-sm font-medium text-gray-500 mb-1">Total:</div>
                <div className="font-medium">${order.totalPrice.toFixed(2)}</div>
              </div>

              {/* Status */}
              <div className="md:col-span-2">
                <div className="md:hidden text-sm font-medium text-gray-500 mb-1">Status:</div>
                <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </div>
              </div>

              {/* Actions */}
              <div className="md:col-span-4 flex justify-start md:justify-end">
                <Link 
                  to={`/order/${order._id}`} 
                  className="inline-flex items-center text-primary-600 hover:text-primary-800"
                >
                  View Details <FiChevronRight className="ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;