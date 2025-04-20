import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';

const NotFoundPage = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl font-medium text-gray-800 mb-6">Page Not Found</h2>
      <p className="text-gray-600 max-w-md mx-auto mb-8">
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </p>
      <Link to="/" className="btn-primary inline-flex items-center">
        <FiHome className="mr-2" /> Back to Orders
      </Link>
    </div>
  );
};

export default NotFoundPage;