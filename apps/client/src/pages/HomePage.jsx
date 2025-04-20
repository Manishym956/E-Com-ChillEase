import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductList from '../components/ProductList';
import { FiWind } from 'react-icons/fi';
import { FaFan } from 'react-icons/fa';

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({});

  // Extract filters from URL params
  useEffect(() => {
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sort = searchParams.get('sort');

    const newFilters = {};
    if (category) newFilters.category = category;
    if (brand) newFilters.brand = brand;
    if (minPrice) newFilters.minPrice = minPrice;
    if (maxPrice) newFilters.maxPrice = maxPrice;
    if (sort) newFilters.sort = sort;

    setFilters(newFilters);
  }, [searchParams]);

  const handleShopCategory = (category) => (e) => {
    e.preventDefault();
    setSearchParams({ category });
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
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
                  onClick={handleShopCategory('fan')} 
                  className="btn bg-white text-primary-600 hover:bg-gray-100"
                >
                  Shop Fans
                </button>
                <button 
                  onClick={handleShopCategory('ac')} 
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

      {/* Categories section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <a
            href="/?category=fan"
            className="group relative bg-gray-100 rounded-lg overflow-hidden h-48 flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-primary-700/20 group-hover:from-primary-500/30 group-hover:to-primary-700/30 transition-colors"></div>
            <div className="text-center z-10">
              <FaFan className="w-12 h-12 mx-auto mb-2 text-primary-600" />
              <h3 className="text-xl font-bold">Fans</h3>
              <p className="text-gray-600">Ceiling, Tower, Table & more</p>
            </div>
          </a>
          <a
            href="/?category=ac"
            className="group relative bg-gray-100 rounded-lg overflow-hidden h-48 flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-primary-700/20 group-hover:from-primary-500/30 group-hover:to-primary-700/30 transition-colors"></div>
            <div className="text-center z-10">
              <FiWind className="w-12 h-12 mx-auto mb-2 text-primary-600" />
              <h3 className="text-xl font-bold">Air Conditioners</h3>
              <p className="text-gray-600">Split, Window, Portable & more</p>
            </div>
          </a>
        </div>
      </section>

      {/* Products section */}
      <section id="products" className="scroll-mt-16">
        <h2 className="text-2xl font-bold mb-6">Our Products</h2>
        <ProductList initialFilters={filters} />
      </section>
    </div>
  );
};

export default HomePage;