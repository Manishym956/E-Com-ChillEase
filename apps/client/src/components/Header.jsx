// apps/client/src/components/Header.jsx
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { logout } from '../utils/auth';

const Header = () => {
  const { user } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/');
  };

  const handleNavigation = (category = null) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        if (category) {
          const productsSection = document.getElementById('products-section');
          if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth' });
            window.dispatchEvent(new CustomEvent('categoryChange', { detail: category }));
          }
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          window.dispatchEvent(new CustomEvent('categoryChange', { detail: null }));
        }
      }, 100);
    } else {
      if (category) {
        const productsSection = document.getElementById('products-section');
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: 'smooth' });
          window.dispatchEvent(new CustomEvent('categoryChange', { detail: category }));
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.dispatchEvent(new CustomEvent('categoryChange', { detail: null }));
      }
    }
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div 
            onClick={() => handleNavigation()}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <span className="text-primary-600 text-2xl font-bold">ChillEase</span>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => handleNavigation()}
              className="text-gray-700 hover:text-primary-600"
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation('fan')}
              className="text-gray-700 hover:text-primary-600"
            >
              Fans
            </button>
            <button
              onClick={() => handleNavigation('ac')}
              className="text-gray-700 hover:text-primary-600"
            >
              ACs
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative text-gray-700 hover:text-primary-600">
              <FiShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-1 text-gray-700 hover:text-primary-600"
                >
                  <FiUser className="w-6 h-6" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-gray-500 truncate">{user.email}</p>
                    </div>
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </Link>
                    <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Orders
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-primary-600">
                <FiUser className="w-6 h-6" />
              </Link>
            )}

            <button
              className="md:hidden text-gray-700 hover:text-primary-600"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <button 
              onClick={() => {
                handleNavigation();
                setMobileMenuOpen(false);
              }}
              className="block py-2 text-gray-700 hover:text-primary-600"
            >
              Home
            </button>
            <button 
              onClick={() => {
                handleNavigation('fan');
                setMobileMenuOpen(false);
              }}
              className="block py-2 text-gray-700 hover:text-primary-600"
            >
              Fans
            </button>
            <button 
              onClick={() => {
                handleNavigation('ac');
                setMobileMenuOpen(false);
              }}
              className="block py-2 text-gray-700 hover:text-primary-600"
            >
              ACs
            </button>
            {user && (
              <>
                <Link 
                  to="/profile" 
                  className="block py-2 text-gray-700 hover:text-primary-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link 
                  to="/orders" 
                  className="block py-2 text-gray-700 hover:text-primary-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Orders
                </Link>
                <button 
                  onClick={(e) => {
                    handleLogout(e);
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-gray-700 hover:text-primary-600"
                >
                  Logout
                </button>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;