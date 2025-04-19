import { createContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

// Initial state
const initialState = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
  shippingAddress: localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {},
  paymentMethod: 'Mock Payment',
};

// Reducer
function cartReducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM': {
      const item = action.payload;
      const existItem = state.cartItems.find(
        (x) => x.product === item.product && x.color === item.color && x.size === item.size
      );

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product && x.color === existItem.color && x.size === existItem.size
              ? item
              : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    }
    case 'CART_REMOVE_ITEM':
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (x) => 
            !(x.product === action.payload.product && 
              x.color === action.payload.color && 
              x.size === action.payload.size)
        ),
      };
    case 'CART_SAVE_SHIPPING_ADDRESS':
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case 'CART_SAVE_PAYMENT_METHOD':
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case 'CART_CLEAR_ITEMS':
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  // Save shipping address to localStorage
  useEffect(() => {
    localStorage.setItem('shippingAddress', JSON.stringify(state.shippingAddress));
  }, [state.shippingAddress]);

  // Add item to cart
  const addToCart = (product, quantity, color, size) => {
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: {
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.variants.find(v => v.color === color && v.size === size).price,
        qty: quantity,
        color,
        size,
      },
    });
  };

  // Remove item from cart
  const removeFromCart = (id, color, size) => {
    dispatch({
      type: 'CART_REMOVE_ITEM',
      payload: { product: id, color, size },
    });
  };

  // Save shipping address
  const saveShippingAddress = (data) => {
    dispatch({
      type: 'CART_SAVE_SHIPPING_ADDRESS',
      payload: data,
    });
  };

  // Save payment method
  const savePaymentMethod = (data) => {
    dispatch({
      type: 'CART_SAVE_PAYMENT_METHOD',
      payload: data,
    });
  };

  // Clear cart
  const clearCart = () => {
    dispatch({ type: 'CART_CLEAR_ITEMS' });
  };

  // Calculate total price
  const cartTotal = state.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        shippingAddress: state.shippingAddress,
        paymentMethod: state.paymentMethod,
        cartTotal,
        addToCart,
        removeFromCart,
        saveShippingAddress,
        savePaymentMethod,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;