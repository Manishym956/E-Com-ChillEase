import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiStar, FiMinus, FiPlus, FiArrowLeft } from 'react-icons/fi';
import { useProduct } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { ToastProvider, useToast } from '../components/ui/Toaster';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading, error } = useProduct(id);
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Memoize available variants and sizes
  const { availableSizes, currentVariant } = useMemo(() => {
    if (!product || !selectedColor) {
      return { availableSizes: [], currentVariant: null };
    }

    const colorVariants = product.variants.filter(v => v.color === selectedColor);
    const uniqueSizes = [...new Set(colorVariants.map(v => v.size))];
    const variant = colorVariants.find(v => v.size === selectedSize);

    return {
      availableSizes: uniqueSizes,
      currentVariant: variant
    };
  }, [product, selectedColor, selectedSize]);

  // Set initial color
  useEffect(() => {
    if (product && !selectedColor) {
      const uniqueColors = [...new Set(product.variants.map(v => v.color))];
      if (uniqueColors.length > 0) {
        setSelectedColor(uniqueColors[0]);
      }
    }
  }, [product, selectedColor]);

  // Set initial size
  useEffect(() => {
    if (availableSizes.length > 0 && !selectedSize) {
      setSelectedSize(availableSizes[0]);
    } else if (availableSizes.length > 0 && !availableSizes.includes(selectedSize)) {
      setSelectedSize(availableSizes[0]);
    }
  }, [availableSizes, selectedSize]);

  // Update quantity if it exceeds stock
  useEffect(() => {
    if (currentVariant && quantity > currentVariant.stock) {
      setQuantity(currentVariant.stock);
    }
  }, [currentVariant, quantity]);

  const handleAddToCart = useCallback(async () => {
    if (!product || !selectedColor || !selectedSize || !currentVariant) {
      addToast('Please select all options before adding to cart', 'error');
      return;
    }

    if (currentVariant.stock === 0) {
      addToast('This item is out of stock', 'error');
      return;
    }

    try {
      setIsAddingToCart(true);
      await addToCart(product, quantity, selectedColor, selectedSize);
      addToast(`Added ${quantity} ${product.name} to cart`, 'success');
    } catch {
      addToast('Failed to add item to cart', 'error');
    } finally {
      setIsAddingToCart(false);
    }
  }, [product, selectedColor, selectedSize, quantity, currentVariant, addToCart, addToast]);

  const incrementQuantity = useCallback(() => {
    if (currentVariant && quantity < currentVariant.stock) {
      setQuantity(prev => prev + 1);
    }
  }, [currentVariant, quantity]);

  const decrementQuantity = useCallback(() => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  }, [quantity]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-primary-600 hover:text-primary-700"
        >
          <FiArrowLeft className="mr-2" />
          Go Back
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-gray-600 mb-4">Product not found</p>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-primary-600 hover:text-primary-700"
        >
          <FiArrowLeft className="mr-2" />
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
      >
        <FiArrowLeft className="mr-2" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <div className="mt-2 flex items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`h-5 w-5 ${
                    i < product.rating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-500">
              ({product.reviews} reviews)
            </span>
          </div>

          {currentVariant && (
            <p className="mt-4 text-2xl font-bold text-gray-900">
              ${currentVariant.price.toFixed(2)}
            </p>
          )}

          <p className="mt-4 text-gray-500">{product.description}</p>

          {/* Color Selection */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Color</h3>
            <div className="mt-2 flex space-x-2">
              {[...new Set(product.variants.map(v => v.color))].map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`h-8 w-8 rounded-full border-2 ${
                    selectedColor === color
                      ? 'border-primary-600'
                      : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          {availableSizes.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Size</h3>
              <div className="mt-2 flex space-x-2">
                {availableSizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md ${
                      selectedSize === size
                        ? 'border-primary-600 text-primary-600'
                        : 'border-gray-300 text-gray-900'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selection */}
          {currentVariant && currentVariant.stock > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
              <div className="mt-2 flex items-center space-x-4">
                <button
                  onClick={decrementQuantity}
                  className="p-2 border rounded-md hover:bg-gray-100"
                >
                  <FiMinus className="h-4 w-4" />
                </button>
                <span className="text-lg font-medium">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  className="p-2 border rounded-md hover:bg-gray-100"
                >
                  <FiPlus className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                {currentVariant.stock} in stock
              </p>
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!currentVariant || currentVariant.stock === 0 || isAddingToCart}
            className={`mt-8 w-full py-3 px-4 rounded-md text-white font-medium ${
              !currentVariant || currentVariant.stock === 0 || isAddingToCart
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary-600 hover:bg-primary-700'
            }`}
          >
            {isAddingToCart ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ProductPageWithToast() {
  return (
    <ToastProvider>
      <ProductPage />
    </ToastProvider>
  );
}