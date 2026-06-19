import { useState, useEffect } from 'react';
import { getProducts, getProductById, getProductsByCategory } from '../services/api';

const isValidProduct = (product) => {
  const hasValidPrice = typeof product.price === 'number' && product.price > 0;
  const hasValidTitle = product.title && product.title.trim().length > 0;
  const hasValidImage = product.images && product.images.length > 0 && product.images[0].startsWith('http');
  return hasValidPrice && hasValidTitle && hasValidImage;
};

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
          setProducts(data.filter(isValidProduct));
        } else { // type === 'all'
          data = await getProducts(limit, offset);
          setProducts(data.filter(isValidProduct));
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