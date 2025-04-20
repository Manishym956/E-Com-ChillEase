// apps/rider-pwa/src/components/EmptyState.jsx
import { FiPackage } from 'react-icons/fi';

const EmptyState = ({ title = 'No orders', message }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-gray-100 rounded-full p-4 mb-4">
        <FiPackage className="h-10 w-10 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      {message && <p className="text-gray-500">{message}</p>}
    </div>
  );
};

export default EmptyState;