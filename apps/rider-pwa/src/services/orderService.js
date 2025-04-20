import api from './api';

// Get all orders assigned to rider
export const getRiderOrders = async () => {
  try {
    const { data } = await api.get('/riders/orders');
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

// Update order to delivered
export const markAsDelivered = async (id) => {
  try {
    const { data } = await api.put(`/orders/${id}/deliver`);
    return data;
  } catch (error) {
    console.error('Error marking order as delivered:', error);
    throw error;
  }
};

// Update order to undelivered
export const markAsUndelivered = async (id) => {
  try {
    const { data } = await api.put(`/orders/${id}/undeliver`);
    return data;
  } catch (error) {
    console.error('Error marking order as undelivered:', error);
    throw error;
  }
};