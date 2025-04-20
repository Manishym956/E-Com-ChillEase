import { NavLink } from 'react-router-dom';
import { FiPackage, FiUser } from 'react-icons/fi';

const BottomNavigation = () => {
  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-around h-16">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full ${
                isActive ? 'text-primary-600' : 'text-gray-500 hover:text-primary-600'
              }`
            }
            end
          >
            <FiPackage className="h-6 w-6" />
            <span className="text-xs mt-1">Orders</span>
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full ${
                isActive ? 'text-primary-600' : 'text-gray-500 hover:text-primary-600'
              }`
            }
          >
            <FiUser className="h-6 w-6" />
            <span className="text-xs mt-1">Profile</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigation;