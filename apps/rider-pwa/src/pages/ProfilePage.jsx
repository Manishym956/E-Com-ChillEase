// apps/rider-pwa/src/pages/ProfilePage.jsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FiLogOut } from 'react-icons/fi';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="p-6 flex items-center border-b">
          {user?.picture ? (
            <img
              src={user.picture}
              alt={user.name}
              className="h-20 w-20 rounded-full mr-6"
            />
          ) : (
            <div className="h-20 w-20 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mr-6">
              <span className="text-2xl font-medium">
                {user?.name?.charAt(0).toUpperCase() || 'R'}
              </span>
            </div>
          )}
          
          <div>
            <h2 className="text-xl font-bold">{user?.name}</h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Role</h3>
              <p>Rider</p>
            </div>
            
            {user?.phone && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                <p>{user.phone}</p>
              </div>
            )}
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Account Created</h3>
              <p>{new Date(user?.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
      
      <button 
        onClick={handleLogout}
        className="btn-danger w-full flex justify-center items-center"
      >
        <FiLogOut className="mr-2" /> Logout
      </button>
    </div>
  );
};

export default ProfilePage;