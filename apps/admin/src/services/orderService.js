import api from './api';

// Get all orders
export const getAllOrders = async () => {
  try {
    const { data } = await api.get('/orders');
    return data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

// Get order by ID
export const getOrderById = async (id) => {
  try {
    const { data } = await api.get(`/orders/${id}`);
    return data;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
};

// Update order status to shipped and assign rider
export const shipOrder = async (id, riderId) => {
  try {
    const { data } = await api.put(`/orders/${id}/ship`, { riderId });
    return data;
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
};