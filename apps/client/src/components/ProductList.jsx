import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { useProducts } from '../hooks/useProducts';
import { FiFilter, FiX } from 'react-icons/fi';

const ProductList = ({ initialFilters = {} }) => {
  const [filters, setFilters] = useState(initialFilters);
  const [showFilters, setShowFilters] = useState(false);
  const { products, loading, error, searchParams, setSearchParams } = useProducts(filters);

  useEffect(() => {
    // Sync URL parameters with filters
    const urlCategory = searchParams.get('category');
    if (urlCategory && urlCategory !== filters.category) {
      setFilters((prev) => ({
        ...prev,
        category: urlCategory,
      }));
      // Add smooth scrolling
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [searchParams]);

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newValue = value === 'all' ? undefined : value;

    // Update URL parameters for category changes
    if (name === 'category') {
      if (newValue) {
        setSearchParams({ ...Object.fromEntries(searchParams), category: newValue });
      } else {
        searchParams.delete('category');
        setSearchParams(searchParams);
      }
    }

    setFilters((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const clearFilters = () => {
    setFilters({});
    setSearchParams({});
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-12 gap-6">
      {/* Filter sidebar - visible on MD and above */}
      <div className="hidden md:block md:col-span-3 lg:col-span-2">
        <div className="bg-warm-50 p-4 rounded shadow-sm border border-warm-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-primary-700">Filters</h3>
            {Object.keys(filters).length > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm text-warm-500 hover:text-warm-400"
              >
                Clear All
              </button>
            )}
          </div>

          <div className="space-y-6">
            {/* Category */}
            <div>
              <h4 className="text-sm font-medium text-primary-600 mb-2">Category</h4>
              <div className="space-y-1">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value="all"
                    checked={!filters.category}
                    onChange={handleFilterChange}
                    className="mr-2"
                  />
                  <span>All</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value="fan"
                    checked={filters.category === 'fan'}
                    onChange={handleFilterChange}
                    className="mr-2"
                  />
                  <span>Fans</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value="ac"
                    checked={filters.category === 'ac'}
                    onChange={handleFilterChange}
                    className="mr-2"
                  />
                  <span>Air Conditioners</span>
                </label>
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h4 className="text-sm font-medium text-primary-600 mb-2">Price Range</h4>
              <div className="space-y-1">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="priceRange"
                    value="all"
                    checked={!filters.minPrice && !filters.maxPrice}
                    onChange={() => {
                      setFilters((prev) => ({
                        ...prev,
                        minPrice: undefined,
                        maxPrice: undefined,
                      }));
                    }}
                    className="mr-2"
                  />
                  <span>All</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="priceRange"
                    value="0-100"
                    checked={filters.minPrice === '0' && filters.maxPrice === '100'}
                    onChange={() => {
                      setFilters((prev) => ({
                        ...prev,
                        minPrice: '0',
                        maxPrice: '100',
                      }));
                    }}
                    className="mr-2"
                  />
                  <span>$0 - $100</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="priceRange"
                    value="100-300"
                    checked={filters.minPrice === '100' && filters.maxPrice === '300'}
                    onChange={() => {
                      setFilters((prev) => ({
                        ...prev,
                        minPrice: '100',
                        maxPrice: '300',
                      }));
                    }}
                    className="mr-2"
                  />
                  <span>$100 - $300</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="priceRange"
                    value="300-500"
                    checked={filters.minPrice === '300' && filters.maxPrice === '500'}
                    onChange={() => {
                      setFilters((prev) => ({
                        ...prev,
                        minPrice: '300',
                        maxPrice: '500',
                      }));
                    }}
                    className="mr-2"
                  />
                  <span>$300 - $500</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="priceRange"
                    value="500+"
                    checked={filters.minPrice === '500' && !filters.maxPrice}
                    onChange={() => {
                      setFilters((prev) => ({
                        ...prev,
                        minPrice: '500',
                        maxPrice: undefined,
                      }));
                    }}
                    className="mr-2"
                  />
                  <span>$500+</span>
                </label>
              </div>
            </div>

            {/* Sorting */}
            <div>
              <h4 className="text-sm font-medium text-primary-600 mb-2">Sort By</h4>
              <select
                name="sort"
                value={filters.sort || 'newest'}
                onChange={handleFilterChange}
                className="w-full p-2 border border-warm-200 rounded text-sm bg-white text-primary-700 focus:border-warm-400 focus:ring-1 focus:ring-warm-400"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div id="products" className="col-span-12 md:col-span-9 lg:col-span-10">
        {/* Mobile filter button */}
        <div className="md:hidden mb-4 flex justify-between items-center">
          <button
            onClick={toggleFilters}
            className="flex items-center space-x-1 bg-warm-50 border border-warm-100 px-3 py-2 rounded text-primary-700 hover:bg-warm-100"
          >
            <FiFilter className="w-4 h-4" />
            <span>Filters</span>
          </button>

          {/* Mobile sort */}
          <select
            name="sort"
            value={filters.sort || 'newest'}
            onChange={handleFilterChange}
            className="p-2 border border-warm-200 rounded text-sm bg-white text-primary-700"
          >
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        {/* Mobile filter sidebar */}
        {showFilters && (
          <div className="md:hidden fixed inset-0 bg-primary-900/50 z-50 flex">
            <div className="bg-warm-50 w-4/5 max-w-sm h-full overflow-auto">
              <div className="p-4 border-b border-warm-100 sticky top-0 bg-warm-50 z-10 flex justify-between items-center">
                <h3 className="text-lg font-medium text-primary-700">Filters</h3>
                <button onClick={toggleFilters}>
                  <FiX className="w-5 h-5 text-primary-600" />
                </button>
              </div>

              <div className="p-4 space-y-6">
                {/* Category */}
                <div>
                  <h4 className="text-sm font-medium text-primary-600 mb-2">Category</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value="all"
                        checked={!filters.category}
                        onChange={handleFilterChange}
                        className="mr-2"
                      />
                      <span>All</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value="fan"
                        checked={filters.category === 'fan'}
                        onChange={handleFilterChange}
                        className="mr-2"
                      />
                      <span>Fans</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value="ac"
                        checked={filters.category === 'ac'}
                        onChange={handleFilterChange}
                        className="mr-2"
                      />
                      <span>Air Conditioners</span>
                    </label>
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="text-sm font-medium text-primary-600 mb-2">Price Range</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="priceRange"
                        value="all"
                        checked={!filters.minPrice && !filters.maxPrice}
                        onChange={() => {
                          setFilters((prev) => ({
                            ...prev,
                            minPrice: undefined,
                            maxPrice: undefined,
                          }));
                        }}
                        className="mr-2"
                      />
                      <span>All</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="priceRange"
                        value="0-100"
                        checked={filters.minPrice === '0' && filters.maxPrice === '100'}
                        onChange={() => {
                          setFilters((prev) => ({
                            ...prev,
                            minPrice: '0',
                            maxPrice: '100',
                          }));
                        }}
                        className="mr-2"
                      />
                      <span>$0 - $100</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="priceRange"
                        value="100-300"
                        checked={filters.minPrice === '100' && filters.maxPrice === '300'}
                        onChange={() => {
                          setFilters((prev) => ({
                            ...prev,
                            minPrice: '100',
                            maxPrice: '300',
                          }));
                        }}
                        className="mr-2"
                      />
                      <span>$100 - $300</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="priceRange"
                        value="300-500"
                        checked={filters.minPrice === '300' && filters.maxPrice === '500'}
                        onChange={() => {
                          setFilters((prev) => ({
                            ...prev,
                            minPrice: '300',
                            maxPrice: '500',
                          }));
                        }}
                        className="mr-2"
                      />
                      <span>$300 - $500</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="priceRange"
                        value="500+"
                        checked={filters.minPrice === '500' && !filters.maxPrice}
                        onChange={() => {
                          setFilters((prev) => ({
                            ...prev,
                            minPrice: '500',
                            maxPrice: undefined,
                          }));
                        }}
                        className="mr-2"
                      />
                      <span>$500+</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-warm-100 sticky bottom-0 bg-warm-50">
                <div className="flex space-x-2">
                  <button
                    onClick={clearFilters}
                    className="btn-secondary flex-1 bg-cool-100 text-primary-600 hover:bg-cool-200"
                  >
                    Clear
                  </button>
                  <button
                    onClick={toggleFilters}
                    className="btn-primary flex-1 bg-warm-400 text-white hover:bg-warm-500"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results count and applied filters */}
        <div className="mb-4 flex flex-wrap items-center justify-between">
          <p className="text-primary-600 mb-2">
            Showing {products.length} products
          </p>

          {/* Applied filters */}
          {Object.keys(filters).length > 0 && (
            <div className="flex flex-wrap gap-2">
              {filters.category && (
                <div className="bg-warm-100 text-primary-700 text-sm px-3 py-1 rounded-full flex items-center">
                  Category: {filters.category === 'ac' ? 'Air Conditioner' : 'Fan'}
                  <button
                    onClick={() => {
                      setFilters((prev) => ({
                        ...prev,
                        category: undefined,
                      }));
                    }}
                    className="ml-1 text-warm-500 hover:text-warm-400"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
              )}
              {filters.minPrice && (
                <div className="bg-warm-100 text-primary-700 text-sm px-3 py-1 rounded-full flex items-center">
                  Price: 
                  {filters.minPrice && !filters.maxPrice 
                    ? ` ${filters.minPrice}+`
                    : ` ${filters.minPrice} - ${filters.maxPrice}`}
                  <button
                    onClick={() => {
                      setFilters((prev) => ({
                        ...prev,
                        minPrice: undefined,
                        maxPrice: undefined,
                      }));
                    }}
                    className="ml-1 text-warm-500 hover:text-warm-400"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {products.length === 0 ? (
          <div className="bg-cool-50 p-8 rounded text-center border border-cool-100">
            <h3 className="text-lg font-medium text-primary-700 mb-2">No products found</h3>
            <p className="text-primary-600 mb-4">Try changing your filters or search term.</p>
            <button onClick={clearFilters} className="btn-primary bg-warm-400 text-white hover:bg-warm-500">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;