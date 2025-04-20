// apps/client/src/components/Footer.jsx
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.dispatchEvent(new CustomEvent('categoryChange', { detail: null }));
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
        }
      }, 100);
    } else {
      if (category) {
        const productsSection = document.getElementById('products-section');
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: 'smooth' });
          window.dispatchEvent(new CustomEvent('categoryChange', { detail: category }));
        }
      }
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and About */}
          <div>
            <h3 className="text-xl font-bold mb-4">ChillEase</h3>
            <p className="text-gray-400 mb-4">
              Premium quality fans and air conditioners for your home and office.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FiFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FiInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={handleHomeClick} className="text-gray-400 hover:text-white">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('fan')} className="text-gray-400 hover:text-white">
                  Fans
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('ac')} className="text-gray-400 hover:text-white">
                  Air Conditioners
                </button>
              </li>
              <li>
                <Link to="/profile" className="text-gray-400 hover:text-white">My Account</Link>
              </li>
              <li>
                <Link to="/orders" className="text-gray-400 hover:text-white">Orders</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <address className="not-italic text-gray-400 space-y-2">
              <p>123 Cooling Street, Breezeville</p>
              <p>Email: info@chillease.com</p>
              <p>Phone: +1 (555) 123-4567</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-4 text-center text-gray-400">
          <p>&copy; {currentYear} ChillEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;