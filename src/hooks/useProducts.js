import { useState, useEffect } from 'react';
import { getProducts, getProductById, getProductsByCategory } from '../services/api';

const useProducts = (type = 'all', id = null, categoryId = null, limit = 10, offset = 0) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        let data;
        if (type === 'single' && id) {
          data = await getProductById(id);
          setProducts(data);
        } else if (type === 'category' && categoryId) {
          data = await getProductsByCategory(categoryId, limit, offset);
          setProducts(data);
        } else { // type === 'all'
          data = await getProducts(limit, offset);
          setProducts(data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [type, id, categoryId, limit, offset]);

  return { products, loading, error };
};

export default useProducts;
