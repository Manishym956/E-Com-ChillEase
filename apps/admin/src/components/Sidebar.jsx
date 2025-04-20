// apps/admin/src/components/Sidebar.jsx
import { NavLink } from 'react-router-dom';
import { FiHome, FiPackage, FiUsers, FiX } from 'react-icons/fi';

const Sidebar = ({ open, toggleSidebar }) => {
  return (
    <>
      {/* Mobile sidebar backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-primary-900/50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-warm-50 border-r border-warm-100 shadow-md transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-auto md:z-auto ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-warm-100">
            <span className="font-bold text-xl text-primary-700">ChillEase</span>
            <button
              onClick={toggleSidebar}
              className="md:hidden text-gray-500 hover:text-gray-600"
            >
              <FiX className="h-6 w-6" />
            </button>
          </div>

          {/* Sidebar content */}
          <nav className="flex-1 px-2 py-4 overflow-y-auto">
            <ul className="space-y-1">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-md ${
                      isActive 
                        ? 'bg-warm-100 text-primary-700' 
                        : 'text-primary-600 hover:bg-warm-50'
                    }`
                  }
                  end
                >
                  <FiHome className="mr-3 h-5 w-5" />
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/orders"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-md ${
                      isActive 
                        ? 'bg-warm-100 text-primary-700' 
                        : 'text-primary-600 hover:bg-warm-50'
                    }`
                  }
                >
                  <FiPackage className="mr-3 h-5 w-5" />
                  Orders
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/riders"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-md ${
                      isActive 
                        ? 'bg-warm-100 text-primary-700' 
                        : 'text-primary-600 hover:bg-warm-50'
                    }`
                  }
                >
                  <FiUsers className="mr-3 h-5 w-5" />
                  Riders
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
