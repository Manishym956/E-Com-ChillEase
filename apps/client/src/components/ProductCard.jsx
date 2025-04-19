// apps/client/src/components/ProductCard.jsx
import { Link } from 'react-router-dom';
import { FiStar } from 'react-icons/fi';

const ProductCard = ({ product }) => {
  // Find the lowest price among all variants
  const lowestPrice = product.variants.reduce(
    (min, variant) => (variant.price < min ? variant.price : min),
    Infinity
  );

  // Find the highest price among all variants
  const highestPrice = product.variants.reduce(
    (max, variant) => (variant.price > max ? variant.price : max),
    0
  );

  // Get unique colors
  const colors = [...new Set(product.variants.map(variant => variant.color))];

  return (
    <Link to={`/product/${product._id}`} className="card transition-transform hover:shadow-md hover:-translate-y-1">
      <div className="relative aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full"
        />
        <div className="absolute top-2 left-2 bg-primary-600 text-white text-xs px-2 py-1 rounded">
          {product.category === 'fan' ? 'Fan' : 'AC'}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-1 line-clamp-1">
          {product.name}
        </h3>
        
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span className="flex items-center">
            <FiStar className={`w-4 h-4 ${product.rating >= 1 ? 'fill-yellow-500 text-yellow-500' : ''}`} />
            <FiStar className={`w-4 h-4 ${product.rating >= 2 ? 'fill-yellow-500 text-yellow-500' : ''}`} />
            <FiStar className={`w-4 h-4 ${product.rating >= 3 ? 'fill-yellow-500 text-yellow-500' : ''}`} />
            <FiStar className={`w-4 h-4 ${product.rating >= 4 ? 'fill-yellow-500 text-yellow-500' : ''}`} />
            <FiStar className={`w-4 h-4 ${product.rating >= 5 ? 'fill-yellow-500 text-yellow-500' : ''}`} />
          </span>
          <span className="ml-1">({product.numReviews})</span>
        </div>

        <div className="flex justify-between items-center">
          <div>
            {lowestPrice === highestPrice ? (
              <p className="font-bold text-gray-900">${lowestPrice.toFixed(2)}</p>
            ) : (
              <p className="font-bold text-gray-900">
                ${lowestPrice.toFixed(2)} - ${highestPrice.toFixed(2)}
              </p>
            )}
          </div>
          
          <div className="flex space-x-1">
            {colors.slice(0, 3).map(color => (
              <div
                key={color}
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ 
                  backgroundColor: 
                    color.toLowerCase() === 'white' ? '#ffffff' : 
                    color.toLowerCase() === 'black' ? '#000000' : 
                    color.toLowerCase() === 'brown' ? '#a52a2a' :
                    color.toLowerCase() === 'blue' ? '#0000ff' : color
                }}
              />
            ))}
            {colors.length > 3 && (
              <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                +{colors.length - 3}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;