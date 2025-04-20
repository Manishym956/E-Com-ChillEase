import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAllProducts, getProductById } from '../services/productService';

export const useProducts = (filters = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Combine URL params with filters
        const urlCategory = searchParams.get('category');
        const combinedFilters = {
          ...filters,
          category: urlCategory || filters.category
        };
        const data = await getAllProducts(combinedFilters);
        setProducts(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters, searchParams]);

  return { products, loading, error, searchParams, setSearchParams };
};

export function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch product');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading, error };
}