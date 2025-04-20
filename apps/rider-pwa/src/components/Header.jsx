import { useNavigate } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span className="font-bold text-xl text-primary-600">CoolBreeze Rider</span>
          </div>

          {/* User Profile */}
          <button 
            onClick={() => navigate('/profile')}
            className="flex items-center space-x-2"
          >
            {user?.picture ? (
              <img
                src={user.picture}
                alt="Profile"
                className="h-8 w-8 rounded-full"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
                <FiUser />
              </div>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;