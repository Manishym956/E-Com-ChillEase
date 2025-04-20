import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiTruck } from 'react-icons/fi';
import { useOrder } from '../hooks/useOrders';
import { useRiders } from '../hooks/useRiders';
import { shipOrder } from '../services/orderService';
import StatusBadge from '../components/StatusBadge';
import Loader from '../components/Loader';

const OrderDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { order, loading, error, refreshOrder } = useOrder(id);
  const { riders, loading: loadingRiders } = useRiders();
  const [selectedRider, setSelectedRider] = useState('');
  const [isShipping, setIsShipping] = useState(false);
  const [shipError, setShipError] = useState('');

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleRiderChange = (e) => {
    setSelectedRider(e.target.value);
  };

  const handleShipOrder = async () => {
    if (!selectedRider) {
      setShipError('Please select a rider');
      return;
    }

    try {
      setIsShipping(true);
      setShipError('');
      await shipOrder(order._id, selectedRider);
      await refreshOrder();
    } catch (error) {
      console.error('Error shipping order:', error);
      setShipError('Failed to ship order');
    } finally {
      setIsShipping(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error || !order) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded">
        <p>{error || 'Order not found'}</p>
        <button
          onClick={() => navigate('/orders')}
          className="mt-4 inline-flex items-center text-red-700 hover:text-red-900"
        >
          <FiArrowLeft className="mr-1" /> Back to Orders
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <div className="flex items-center">
            <Link
              to="/orders"
              className="mr-4 text-gray-500 hover:text-gray-700"
            >
              <FiArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-bold">
              Order #{order._id.substring(order._id.length - 6)}
            </h1>
          </div>
          <div className="mt-1 flex items-center">
            <StatusBadge status={order.status} />
            <span className="ml-2 text-sm text-gray-500">
              {formatDate(order.createdAt)}
            </span>
          </div>
        </div>

        {order.status === 'Paid' && (
          <div className="mt-4 md:mt-0">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
              <select
                value={selectedRider}
                onChange={handleRiderChange}
                className="select"
                disabled={isShipping || loadingRiders}
              >
                <option value="">Select Rider</option>
                {riders.map((rider) => (
                  <option key={rider._id} value={rider._id}>
                    {rider.name}
                  </option>
                ))}
              </select>
              <button
                onClick={handleShipOrder}
                disabled={isShipping || !selectedRider}
                className="btn-primary inline-flex items-center"
              >
                <FiTruck className="mr-2" />
                {isShipping ? 'Processing...' : 'Ship Order'}
              </button>
            </div>
            {shipError && <p className="mt-2 text-sm text-red-600">{shipError}</p>}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Customer Info */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Customer Information</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{order.user?.name || 'Unknown'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{order.user?.email || 'Unknown'}</p>
            </div>
          </div>
        </div>

        {/* Shipping Info */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h2>
          <div className="space-y-1">
            <p>{order.shippingAddress.street}</p>
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
              {order.shippingAddress.zipCode}
            </p>
            <p>{order.shippingAddress.country}</p>
          </div>
        </div>

        {/* Order Info */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Order Information</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Payment Method</p>
              <p className="font-medium">{order.paymentMethod}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="font-medium">${order.totalPrice.toFixed(2)}</p>
            </div>
            {order.rider && (
              <div>
                <p className="text-sm text-gray-500">Assigned Rider</p>
                <p className="font-medium">{order.rider.name}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Order Items</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {order.orderItems.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded object-cover"
                          src={item.image}
                          alt={item.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">
                          {item.color}, {item.size}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                    {item.qty}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    ${(item.price * item.qty).toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50">
                <td className="px-6 py-4" colSpan="3">
                  <div className="text-right font-medium">Total</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  ${order.totalPrice.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;