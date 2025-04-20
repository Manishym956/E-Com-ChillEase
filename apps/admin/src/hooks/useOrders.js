import { useState, useEffect } from 'react';
import { getAllOrders, getOrderById } from '../services/orderService';

export function useOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await getAllOrders();
        setOrders(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch orders');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const refreshOrders = async () => {
    try {
      setLoading(true);
      const data = await getAllOrders();
      setOrders(data);
      setError(null);
      return true;
    } catch (err) {
      setError('Failed to refresh orders');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { orders, loading, error, refreshOrders };
}

export function useOrder(id) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const data = await getOrderById(id);
        setOrder(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch order');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const refreshOrder = async () => {
    try {
      setLoading(true);
      const data = await getOrderById(id);
      setOrder(data);
      setError(null);
      return true;
    } catch (err) {
      setError('Failed to refresh order');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { order, loading, error, refreshOrder };
}
