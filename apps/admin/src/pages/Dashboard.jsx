import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPackage, FiTruck, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useOrders } from '../hooks/useOrders';
import Loader from '../components/Loader';

const Dashboard = () => {
  const { orders, loading, error } = useOrders();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total: 0,
    paid: 0,
    shipped: 0,
    delivered: 0,
    undelivered: 0,
  });

  useEffect(() => {
    if (orders.length) {
      const newStats = {
        total: orders.length,
        paid: orders.filter(order => order.status === 'Paid').length,
        shipped: orders.filter(order => order.status === 'Shipped').length,
        delivered: orders.filter(order => order.status === 'Delivered').length,
        undelivered: orders.filter(order => order.status === 'Undelivered').length,
      };
      setStats(newStats);
    }
  }, [orders]);

  const handleCardClick = (status) => {
    navigate(`/orders${status ? `?status=${status}` : ''}`);
  };

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

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div 
          onClick={() => handleCardClick()}
          className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <FiPackage className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Orders</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
          </div>
        </div>

        <div 
          onClick={() => handleCardClick('Paid')}
          className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
              <FiPackage className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Pending</p>
              <p className="text-2xl font-bold">{stats.paid}</p>
            </div>
          </div>
        </div>

        <div 
          onClick={() => handleCardClick('Shipped')}
          className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
              <FiTruck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Shipped</p>
              <p className="text-2xl font-bold">{stats.shipped}</p>
            </div>
          </div>
        </div>

        <div 
          onClick={() => handleCardClick('Delivered')}
          className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <FiCheckCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Delivered</p>
              <p className="text-2xl font-bold">{stats.delivered}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
            <Link to="/orders" className="text-primary-600 hover:text-primary-800 text-sm">
              View all
            </Link>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No orders available</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        to={`/orders/${order._id}`}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        #{order._id.substring(order._id.length - 6)}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {order.user?.name || 'Unknown'}
                      </div>
                      <div className="text-sm text-gray-500">{order.user?.email || 'Unknown'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${order.status === 'Paid' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : ''}
                        ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : ''}
                        ${order.status === 'Undelivered' ? 'bg-red-100 text-red-800' : ''}
                      `}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${order.totalPrice.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;