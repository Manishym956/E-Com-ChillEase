// apps/client/src/pages/CartPage.jsx
import { Link } from 'react-router-dom';
import { FiTrash2, FiShoppingCart, FiArrowRight } from 'react-icons/fi';
import { useCart } from '../hooks/useCart';
import { ToastProvider, useToast } from '../components/ui/Toaster';

const CartPage = () => {
  const { cartItems, removeFromCart, cartTotal } = useCart();
  const { addToast } = useToast();

  const handleRemoveItem = (id, color, size) => {
    removeFromCart(id, color, size);
    addToast('Item removed from cart', 'success');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <div className="flex justify-center mb-4">
            <FiShoppingCart className="w-16 h-16 text-gray-400" />
          </div>
          <h2 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
          <Link to="/" className="btn-primary inline-flex items-center">
            Start Shopping <FiArrowRight className="ml-2" />
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-12 gap-6">
          {/* Cart Items */}
          <div className="md:col-span-8">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="hidden md:grid md:grid-cols-12 p-4 border-b bg-gray-50 text-sm font-medium text-gray-500">
                <div className="md:col-span-6">Product</div>
                <div className="md:col-span-2 text-center">Price</div>
                <div className="md:col-span-2 text-center">Quantity</div>
                <div className="md:col-span-2 text-right">Total</div>
              </div>

              {cartItems.map((item) => (
                <div 
                  key={`${item.product}-${item.color}-${item.size}`}
                  className="p-4 border-b last:border-0 grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
                >
                  {/* Product */}
                  <div className="md:col-span-6 flex items-center space-x-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <div className="text-sm text-gray-500 space-y-1">
                        <p>Color: {item.color}</p>
                        <p>Size: {item.size}</p>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="md:col-span-2 text-center">
                    <div className="md:hidden text-sm font-medium text-gray-500">Price:</div>
                    <div className="font-medium">${item.price.toFixed(2)}</div>
                  </div>

                  {/* Quantity */}
                  <div className="md:col-span-2 text-center">
                    <div className="md:hidden text-sm font-medium text-gray-500">Quantity:</div>
                    <div className="font-medium">{item.qty}</div>
                  </div>

                  {/* Total */}
                  <div className="md:col-span-2 flex justify-between md:justify-end items-center">
                    <div className="md:hidden text-sm font-medium text-gray-500">Total:</div>
                    <div className="font-medium">${(item.price * item.qty).toFixed(2)}</div>
                    
                    <button
                      onClick={() => handleRemoveItem(item.product, item.color, item.size)}
                      className="ml-4 text-gray-400 hover:text-red-500"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="md:col-span-4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              
              <div className="border-t border-b py-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
              </div>
              
              <div className="flex justify-between mb-6">
                <span className="text-lg font-medium">Total</span>
                <span className="text-lg font-bold">${cartTotal.toFixed(2)}</span>
              </div>
              
              <Link to="/checkout" className="btn-primary w-full flex justify-center">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function CartPageWithToast() {
  return (
    <ToastProvider>
      <CartPage />
    </ToastProvider>
  );
}