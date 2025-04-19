import api from './api';

// Create new order
export const createOrder = async (orderData) => {
  try {
    const { data } = await api.post('/orders', orderData);
    return data;
  } catch (error) {
    console.error('Create order error:', error);
    throw error;
  }
};

// Get my orders
export const getMyOrders = async () => {
  try {
    const { data } = await api.get('/orders/myorders');
    return data;
  } catch (error) {
    console.error('Get my orders error:', error);
    throw error;
  }
};

// Get order by ID
export const getOrderById = async (id) => {
  try {
    const { data } = await api.get(`/orders/${id}`);
    return data;
  } catch (error) {
    console.error('Get order error:', error);
    throw error;
  }
};