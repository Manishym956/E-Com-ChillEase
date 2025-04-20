// apps/rider-pwa/src/pages/OrderDetailsPage.jsx
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiPhone, FiMapPin, FiCheckCircle, FiXCircle, FiPackage } from 'react-icons/fi';
import { useOrder } from '../hooks/useOrders';
import { markAsDelivered, markAsUndelivered } from '../services/orderService';
import Loader from '../components/Loader';

const OrderDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { order, loading, error, refreshOrder } = useOrder(id);
  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState('');

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle mark as delivered
  const handleMarkDelivered = async () => {
    try {
      setUpdating(true);
      setUpdateError('');
      await markAsDelivered(id);
      await refreshOrder();
    } catch (error) {
      console.error('Error marking as delivered:', error);
      setUpdateError('Failed to mark as delivered');
    } finally {
      setUpdating(false);
    }
  };

  // Handle mark as undelivered
  const handleMarkUndelivered = async () => {
    try {
      setUpdating(true);
      setUpdateError('');
      await markAsUndelivered(id);
      await refreshOrder();
    } catch (error) {
      console.error('Error marking as undelivered:', error);
      setUpdateError('Failed to mark as undelivered');
    } finally {
      setUpdating(false);
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
          onClick={() => navigate('/')}
          className="mt-4 inline-flex items-center text-red-700 hover:text-red-900"
        >
          <FiArrowLeft className="mr-1" /> Back to Orders
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Order Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/')}
          className="mb-2 inline-flex items-center text-gray-500 hover:text-gray-700"
        >
          <FiArrowLeft className="mr-1" /> Back
        </button>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">Order #{order._id.substring(order._id.length - 6)}</h1>
            <p className="text-gray-500">{formatDate(order.createdAt)}</p>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium 
            ${order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : ''}
            ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : ''}
            ${order.status === 'Undelivered' ? 'bg-red-100 text-red-800' : ''}
          `}>
            {order.status}
          </div>
        </div>
      </div>

      {/* Customer Details */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="p-4 border-b">
          <h2 className="text-lg font-medium">Customer Details</h2>
        </div>
        <div className="p-4">
          <div className="mb-4">
            <p className="font-medium">{order.user?.name || 'Customer'}</p>
            <p className="text-gray-500">{order.user?.email || 'No email provided'}</p>
          </div>
          
          {/* Contact Info */}
          <a 
            href={`tel:${order.user?.phone || ''}`}
            className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium ${
              order.user?.phone ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
            onClick={(e) => !order.user?.phone && e.preventDefault()}
          >
            <FiPhone className="mr-2" /> 
            {order.user?.phone ? 'Call Customer' : 'No Phone Number'}
          </a>
        </div>
      </div>

      {/* Delivery Details */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="p-4 border-b">
          <h2 className="text-lg font-medium">Delivery Address</h2>
        </div>
        <div className="p-4">
          <div className="flex items-start space-x-3">
            <div className="text-gray-400 mt-1">
              <FiMapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">{order.shippingAddress.street}</p>
              <p className="text-gray-500">
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
              </p>
              <p className="text-gray-500">{order.shippingAddress.country}</p>
            </div>
          </div>
          
          <div className="mt-4">
            <a 
              href={`https://maps.google.com/?q=${encodeURIComponent(
                `${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-md bg-primary-600 text-white text-sm font-medium"
            >
              Open in Maps
            </a>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="p-4 border-b">
          <h2 className="text-lg font-medium">Order Items</h2>
        </div>
        <div className="p-4">
          {order.orderItems.map((item, index) => (
            <div 
              key={index}
              className={`flex items-center py-3 ${
                index < order.orderItems.length - 1 ? 'border-b' : ''
              }`}
            >
              <div className="flex-shrink-0 h-16 w-16 bg-gray-100 rounded overflow-hidden">
                <img
                  className="h-full w-full object-cover"
                  src={item.image}
                  alt={item.name}
                />
              </div>
              <div className="ml-4 flex-grow">
                <h3 className="text-sm font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  {item.color}, {item.size} - Qty: {item.qty}
                </p>
              </div>
              <div className="ml-2 text-sm font-medium">
                ${(item.price * item.qty).toFixed(2)}
              </div>
            </div>
          ))}
          
          <div className="mt-4 pt-4 border-t flex justify-between">
            <span className="font-medium">Total:</span>
            <span className="font-bold">${order.totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {order.status === 'Shipped' && (
        <div className="flex flex-col space-y-3">
          <button
            onClick={handleMarkDelivered}
            disabled={updating}
            className="btn-success flex justify-center items-center"
          >
            <FiCheckCircle className="mr-2" />
            {updating ? 'Updating...' : 'Mark as Delivered'}
          </button>
          
          <button
            onClick={handleMarkUndelivered}
            disabled={updating}
            className="btn-danger flex justify-center items-center"
          >
            <FiXCircle className="mr-2" />
            {updating ? 'Updating...' : 'Mark as Undelivered'}
          </button>
          
          {updateError && (
            <div className="mt-2 text-center text-red-600 text-sm">
              {updateError}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;