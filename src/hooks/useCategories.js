import { useState, useEffect } from 'react';
import { getCategories } from '../services/api';

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getCategories();
        // Filter and clean category names
        const filtered = data
          .filter(cat => {
            const name = cat.name.toLowerCase().trim();
            // Remove categories that are just numbers or have too many numbers
            const numberCount = (name.match(/\d/g) || []).length;
            return numberCount < 5 && name.length < 40 && name.length > 2;
          })
          .map(cat => ({
            ...cat,
            // Clean up name: remove numbers at the end
            name: cat.name.replace(/\s*\d+\s*$/g, '').trim()
          }))
          // Remove duplicates
          .filter((cat, index, self) =>
            index === self.findIndex(c => c.name.toLowerCase() === cat.name.toLowerCase())
          );
        setCategories(filtered);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export default useCategories;
