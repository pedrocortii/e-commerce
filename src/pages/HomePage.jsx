import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, Button, CircularProgress, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useProducts from '../hooks/useProducts';
import { translateProductTitle } from '../services/translator';

const PLACEHOLDER_IMAGE = 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect width="200" height="200" fill="%23e0e0e0"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-family="sans-serif" font-size="14"%3ESin imagen%3C/text%3E%3C/svg%3E';

const HomePage = () => {
  const { products, loading, error } = useProducts('all', null, null, 20);

  const randomProducts = [...products].sort(() => Math.random() - 0.5).slice(0, 8);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 6,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h5" component="h1" sx={{ fontWeight: 600, letterSpacing: 0.5 }}>
            Descubre la mejor tienda en línea
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 600, letterSpacing: 0.5 }}>
            Productos de calidad a precios accesibles
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 5 }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#0D6EFF' }}>
            Sección Destacada
          </Typography>
          <Typography variant="body2" sx={{ color: '#666', mb: 4 }}>
            Descubre las últimas novedades y ofertas exclusivas de nuestra tienda.
          </Typography>
        </Box>

        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 4, color: '#333' }}>
            Nuestros Productos
          </Typography>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error">Error al cargar los productos: {error.message}</Alert>
          ) : (
            <Grid container spacing={4}>
              {randomProducts.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4}>
                  <Card sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0px 12px 24px rgba(13, 110, 255, 0.15)'
                    }
                  }}>
                    <Box sx={{
                      height: 200,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      overflow: 'hidden',
                      bgcolor: '#f8f9fa',
                      position: 'relative'
                    }}>
                      <CardMedia
                        component="img"
                        sx={{
                          maxHeight: '100%',
                          maxWidth: '100%',
                          objectFit: 'contain',
                          p: 2
                        }}
                        image={product.images && product.images.length > 0 ? product.images[0] : PLACEHOLDER_IMAGE}
                        alt={translateProductTitle(product.title)}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = PLACEHOLDER_IMAGE;
                        }}
                      />
                    </Box>
                    <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, minHeight: '2.4em', lineHeight: 1.3, color: '#222' }} component="h3">
                        {translateProductTitle(product.title)}
                      </Typography>
                      <Typography variant="h6" sx={{ color: '#0D6EFF', fontWeight: 700, fontSize: '1.25rem' }}>
                        ${product.price.toFixed(2)}
                      </Typography>
                    </CardContent>
                    <Box sx={{ p: 2, pt: 0 }}>
                      <Button
                        fullWidth
                        size="medium"
                        variant="contained"
                        color="primary"
                        component={Link}
                        to={`/producto/${product.id}`}
                        sx={{ textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 700 }}
                      >
                        Ver Detalle
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default HomePage;