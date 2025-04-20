import { useState, useEffect } from 'react';
import { getAllRiders } from '../services/riderService';

export function useRiders() {
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRiders = async () => {
      try {
        setLoading(true);
        const data = await getAllRiders();
        setRiders(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch riders');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRiders();
  }, []);

  return { riders, loading, error };
}