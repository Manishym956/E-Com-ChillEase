import { FiPackage, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const EmptyState = ({ icon = 'package', title = 'No data', message, linkTo, linkText }) => {
  const icons = {
    package: <FiPackage className="w-12 h-12 text-gray-400" />,
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
      <div className="flex justify-center mb-4">{icons[icon]}</div>
      <h2 className="text-xl font-medium text-gray-900 mb-2">{title}</h2>
      {message && <p className="text-gray-600 mb-6">{message}</p>}
      {linkTo && linkText && (
        <Link to={linkTo} className="btn-primary inline-flex items-center">
          <FiPlus className="mr-2" /> {linkText}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;

