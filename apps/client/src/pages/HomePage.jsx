import { useState, useRef, useEffect } from 'react';
import ProductList from '../components/ProductList';
import CategoryDisplay from '../components/CategoryDisplay';
import { FiWind } from 'react-icons/fi';
import { FaFan } from 'react-icons/fa';

const HomePage = () => {
  const [currentCategory, setCurrentCategory] = useState(null);
  const [filters, setFilters] = useState({});
  const productsRef = useRef(null);

  useEffect(() => {
    const handleCategoryChange = (event) => {
      const category = event.detail;
      setCurrentCategory(category);
      setFilters({ ...filters, category });
    };

    window.addEventListener('categoryChange', handleCategoryChange);
    return () => window.removeEventListener('categoryChange', handleCategoryChange);
  }, [filters]);

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      {/* Hero section */}
      <section className="bg-primary-600 text-white rounded-lg overflow-hidden mb-8">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Stay Cool and Comfortable Year-Round
              </h1>
              <p className="text-lg mb-6">
                Premium quality fans and air conditioners for your home and office. 
                Find the perfect cooling solution for every space.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => handleCategoryChange('fan')} 
                  className="btn bg-white text-primary-600 hover:bg-gray-100"
                >
                  Shop Fans
                </button>
                <button 
                  onClick={() => handleCategoryChange('ac')} 
                  className="btn bg-white/10 text-white hover:bg-white/20"
                >
                  Shop ACs
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="https://www.shutterstock.com/image-photo/electric-fan-on-table-living-260nw-2469154047.jpg"
                alt="ChillEase Electric Fan"
                className="rounded-lg shadow-lg w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={() => handleCategoryChange('fan')}
            className="group relative bg-gray-100 rounded-lg overflow-hidden h-48 flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-primary-700/20 group-hover:from-primary-500/30 group-hover:to-primary-700/30 transition-colors"></div>
            <div className="text-center z-10">
              <FaFan className="w-12 h-12 mx-auto mb-2 text-primary-600" />
              <h3 className="text-xl font-bold">Fans</h3>
              <p className="text-gray-600">Ceiling, Tower, Table & more</p>
            </div>
          </button>

          <button
            onClick={() => handleCategoryChange('ac')}
            className="group relative bg-gray-100 rounded-lg overflow-hidden h-48 flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-primary-700/20 group-hover:from-primary-500/30 group-hover:to-primary-700/30 transition-colors"></div>
            <div className="text-center z-10">
              <FiWind className="w-12 h-12 mx-auto mb-2 text-primary-600" />
              <h3 className="text-xl font-bold">Air Conditioners</h3>
              <p className="text-gray-600">Split, Window, Portable & more</p>
            </div>
          </button>
        </div>
      </section>

      {/* Products section */}
      <section ref={productsRef} id="products-section" className="scroll-mt-20">
        <h2 className="text-2xl font-bold mb-6">
          {currentCategory ? 
            `${currentCategory === 'fan' ? 'Fans' : 'Air Conditioners'}` : 
            'Our Products'
          }
        </h2>
        <ProductList initialFilters={filters} />
      </section>
    </div>
  );
};

export default HomePage;