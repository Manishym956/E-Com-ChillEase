// apps/rider-pwa/src/components/OrderCard.jsx
import { Link } from 'react-router-dom';
import { FiMapPin } from 'react-icons/fi';

const OrderCard = ({ order }) => {
  // Function to get appropriate status badge color
  const getStatusColor = (status) => {
    switch (status) {
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
    const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Link to={`/orders/${order._id}`} className="block mb-4">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm text-gray-500">Order ID</div>
              <div className="font-medium">#{order._id.substring(order._id.length - 6)}</div>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
              {order.status}
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-start space-x-3">
            <div className="text-gray-400 mt-1">
              <FiMapPin className="h-5 w-5" />
            </div>
            <div>
              <div className="font-medium">{order.user?.name || 'Customer'}</div>
              <div className="text-sm text-gray-500 mt-1">
                {order.shippingAddress.street}, {order.shippingAddress.city}
              </div>
              <div className="text-sm text-gray-500">
                {order.shippingAddress.state} {order.shippingAddress.zipCode}
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-between items-center text-sm">
            <div className="text-gray-500">
              {formatDate(order.createdAt)}
            </div>
            <div className="font-medium">
              {order.orderItems.length} {order.orderItems.length === 1 ? 'item' : 'items'}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;