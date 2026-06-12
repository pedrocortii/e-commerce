import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, CircularProgress, Alert, CardMedia, Grid } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useProducts from '../hooks/useProducts';
import { CartContext } from '../contexts/CartContext';
import { translateProductTitle } from '../services/translator';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const { products, loading, error } = useProducts('single', id); // products will be a single product object here
  const product = products; // Rename for clarity

  const { addProduct } = useContext(CartContext);

  const handleAddToCart = () => {
    if (product) {
      addProduct(product, 1); // Add one quantity of the product
      alert(`${product.title} ha sido agregado al carrito.`); // Simple alert for now
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Button variant="outlined" sx={{ mb: 2 }} onClick={() => navigate(-1)}> {/* "VOLVER" button */}
          Volver
        </Button>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">Error al cargar el producto: {error.message}</Alert>
        ) : product ? (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
              <Box sx={{ width: { xs: '100%', md: '60%' }, display: 'flex', justifyContent: 'center' }}>
                <CardMedia
                  component="img"
                  sx={{
                    height: 'auto',
                    maxWidth: '100%',
                    objectFit: 'contain',
                    borderRadius: 2,
                  }}
                  image={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/400'}
                  alt={translateProductTitle(product.title)}
                />
              </Box>
            </Box>

            <Box sx={{ maxWidth: 600, mx: 'auto' }}>
              <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, color: '#333' }}>
                {translateProductTitle(product.title)}
              </Typography>
              <Typography variant="h5" sx={{ color: '#0D6EFF', fontWeight: 700, mb: 2 }}>
                ${product.price.toFixed(2)}
              </Typography>
              <Box sx={{ my: 3, pb: 2, borderBottom: '1px solid #eee' }}>
                <Typography variant="body1" sx={{ color: '#555', lineHeight: 1.8, fontSize: '0.95rem' }}>
                  {product.description}
                </Typography>
              </Box>
              <Box sx={{ my: 2 }}>
                <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>
                  <strong>Categoría:</strong> {product.category ? product.category.name : 'N/A'}
                </Typography>
              </Box>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleAddToCart}
                sx={{ mt: 2, py: 1.5, fontWeight: 600, fontSize: '1rem' }}
              >
                Agregar al Carrito
              </Button>
            </Box>
          </Box>
        ) : (
          <Alert severity="warning">Producto no encontrado.</Alert>
        )}
      </Container>
      <Footer />
    </Box>
  );
};

export default ProductDetailPage;
