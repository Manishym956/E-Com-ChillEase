import api from './api';

// Get all products with optional filters
export const getAllProducts = async (filters = {}) => {
  try {
    const { category, brand, minPrice, maxPrice, sort } = filters;
    let url = '/products';
    
    // Add query params
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (brand) params.append('brand', brand);
    if (minPrice) params.append('minPrice', minPrice);
    if (maxPrice) params.append('maxPrice', maxPrice);
    if (sort) params.append('sort', sort);
    
    const paramString = params.toString();
    if (paramString) {
      url += `?${paramString}`;
    }
    
    const { data } = await api.get(url);
    return data;
  } catch (error) {
    console.error('Get products error:', error);
    throw error;
  }
};

// Get product by ID
export const getProductById = async (id) => {
  try {
    const { data } = await api.get(`/products/${id}`);
    return data;
  } catch (error) {
    console.error('Get product error:', error);
    throw error;
  }
};
