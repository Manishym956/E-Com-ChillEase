import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';
import { useCart } from '../hooks/useCart';
import { createOrder } from '../services/orderService';
import { ToastProvider, useToast } from '../components/ui/Toaster';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, shippingAddress, saveShippingAddress, clearCart } = useCart();
  const { addToast } = useToast();

  const [address, setAddress] = useState({
    street: shippingAddress.street || '',
    city: shippingAddress.city || '',
    state: shippingAddress.state || '',
    zipCode: shippingAddress.zipCode || '',
    country: shippingAddress.country || 'US'
  });

  const [paymentMethod] = useState('Mock Payment');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      addToast('Your cart is empty', 'error');
      return;
    }

    try {
      setLoading(true);
      
      // Save shipping address
      saveShippingAddress(address);
      
      // Create order
      const orderData = {
        orderItems: cartItems,
        shippingAddress: address,
        paymentMethod,
        totalPrice: cartTotal
      };
      
      const createdOrder = await createOrder(orderData);
      
      // Clear cart after successful order
      clearCart();
      
      addToast('Order placed successfully!', 'success');
      
      // Redirect to order details page
      navigate(`/order/${createdOrder._id}`);
    } catch (error) {
      console.error('Error placing order:', error);
      addToast('Failed to place order. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>
      
      <div className="grid md:grid-cols-12 gap-6">
        {/* Checkout Form */}
        <div className="md:col-span-8">
          <form onSubmit={handleSubmit}>
            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    value={address.street}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={address.city}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                    State / Province
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={address.state}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP / Postal Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={address.zipCode}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={address.country}
                    onChange={handleChange}
                    className="select"
                    required
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h2>
              
              <div className="border rounded-md p-4 bg-gray-50 flex items-center space-x-3">
                <div className="bg-primary-600 text-white rounded-full p-1">
                  <FiCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium">Mock Payment</p>
                  <p className="text-sm text-gray-500">This is a demo payment method for testing.</p>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <button 
                type="submit" 
                className="btn-primary"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </form>
        </div>
        
        {/* Order Summary */}
        <div className="md:col-span-4">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
            
            <div className="max-h-80 overflow-y-auto mb-4">
              {cartItems.map((item) => (
                <div 
                  key={`${item.product}-${item.color}-${item.size}`}
                  className="flex items-start py-3 border-b last:border-0"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded overflow-hidden mr-3">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-gray-500">
                      {item.color}, {item.size} - Qty: {item.qty}
                    </p>
                  </div>
                  <div className="flex-shrink-0 ml-2 text-sm font-medium">
                    ${(item.price * item.qty).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default function CheckoutPageWithToast() {
  return (
    <ToastProvider>
      <CheckoutPage />
    </ToastProvider>
  );
}