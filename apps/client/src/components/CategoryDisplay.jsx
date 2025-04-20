import ProductList from './ProductList';

const CategoryDisplay = ({ category }) => {
  const categoryTitles = {
    fan: 'Fans',
    ac: 'Air Conditioners'
  };

  const categoryDescriptions = {
    fan: 'Browse our collection of high-quality fans for every space',
    ac: 'Discover our range of efficient air conditioning solutions'
  };

  return (
    <section>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{categoryTitles[category]}</h1>
        <p className="text-gray-600">{categoryDescriptions[category]}</p>
      </div>

      <ProductList initialFilters={{ category }} />
    </section>
  );
};

export default CategoryDisplay;
