// apps/client/src/components/Layout.jsx
import { Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';
import Header from './Header';
import Footer from './Footer';
import { Toaster } from './ui/Toaster';
import ErrorBoundary from './ErrorBoundary';

const Layout = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { pathname } = useLocation();

  // Scroll restoration
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Scroll-to-top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ErrorBoundary>
      <div className="flex flex-col min-h-screen relative">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Outlet />
        </main>
        <Footer />
        <Toaster />
        
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-primary-600 text-white p-3 rounded-full shadow-lg hover:bg-primary-700 transition-all z-50"
            aria-label="Scroll to top"
          >
            <FiArrowUp className="w-6 h-6" />
          </button>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default Layout;