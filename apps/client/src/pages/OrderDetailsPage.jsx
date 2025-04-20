import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { useOrder } from '../hooks/useOrders';

const OrderDetailsPage = () => {
  const { id } = useParams();
  const { order, loading, error } = useOrder(id);

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
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded">
        <p>{error || 'Order not found'}</p>
        <Link to="/orders" className="mt-4 inline-flex items-center text-red-700 hover:text-red-900">
          <FiArrowLeft className="mr-1" /> Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Order #{order._id.substring(order._id.length - 6)}
        </h1>
        <Link to="/orders" className="text-primary-600 hover:text-primary-800 inline-flex items-center">
          <FiArrowLeft className="mr-1" /> Back to Orders
        </Link>
      </div>

      {/* Order Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Status */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Order Status</h2>
          <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
            {order.status}
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p>Order Date: {formatDate(order.createdAt)}</p>
            {order.status === 'Shipped' && order.rider && (
              <div className="mt-2">
                <p className="font-medium">Rider Information:</p>
                <p>{order.rider.name}</p>
                {order.rider.phone && <p>Phone: {order.rider.phone}</p>}
              </div>
            )}
          </div>
        </div>

        {/* Shipping */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h2>
          <address className="not-italic text-gray-600">
            <p>{order.shippingAddress.street}</p>
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
              {order.shippingAddress.zipCode}
            </p>
            <p>{order.shippingAddress.country}</p>
          </address>
        </div>

        {/* Payment */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Information</h2>
          <p className="text-gray-600">
            Method: {order.paymentMethod}
          </p>
          <div className="mt-2">
            <p className="font-medium">Amount: ${order.totalPrice.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
        <h2 className="text-lg font-medium text-gray-900 p-6 border-b">Order Items</h2>
        
        <div className="hidden md:grid md:grid-cols-12 p-4 border-b bg-gray-50 text-sm font-medium text-gray-500">
          <div className="md:col-span-6">Product</div>
          <div className="md:col-span-2 text-center">Price</div>
          <div className="md:col-span-2 text-center">Quantity</div>
          <div className="md:col-span-2 text-right">Total</div>
        </div>

        {order.orderItems.map((item) => (
          <div 
            key={`${item.product}-${item.color}-${item.size}`}
            className="p-4 border-b last:border-0 grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
          >
            {/* Product */}
            <div className="md:col-span-6 flex items-center space-x-4">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="font-medium text-gray-900">{item.name}</h3>
                <div className="text-sm text-gray-500 space-y-1">
                  <p>Color: {item.color}</p>
                  <p>Size: {item.size}</p>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="md:col-span-2 text-center">
              <div className="md:hidden text-sm font-medium text-gray-500 mb-1">Price:</div>
              <div className="font-medium">${item.price.toFixed(2)}</div>
            </div>

            {/* Quantity */}
            <div className="md:col-span-2 text-center">
              <div className="md:hidden text-sm font-medium text-gray-500 mb-1">Quantity:</div>
              <div className="font-medium">{item.qty}</div>
            </div>

            {/* Total */}
            <div className="md:col-span-2 text-right">
              <div className="md:hidden text-sm font-medium text-gray-500 mb-1">Total:</div>
              <div className="font-medium">${(item.price * item.qty).toFixed(2)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetailsPage;