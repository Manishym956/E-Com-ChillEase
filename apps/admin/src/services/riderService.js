import api from './api';

// Get all riders
export const getAllRiders = async () => {
  try {
    const { data } = await api.get('/riders');
    return data;
  } catch (error) {
    console.error('Error fetching riders:', error);
    throw error;
  }
};