import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, Button, TextField, CircularProgress, Alert, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useProducts from '../hooks/useProducts';
import useCategories from '../hooks/useCategories';
import { translateProductTitle } from '../services/translator';

const PLACEHOLDER_IMAGE = 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect width="200" height="200" fill="%23e0e0e0"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-family="sans-serif" font-size="14"%3ESin imagen%3C/text%3E%3C/svg%3E';

const ProductsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || '';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [offset, setOffset] = useState(0);
  const limit = 12; // cantidad de productos por pagina

  const { products: allProducts, loading: productsLoading, error: productsError } = useProducts(
    selectedCategory ? 'category' : 'all',
    null,
    selectedCategory,
    limit,
    offset
  );
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();

  // filtra productos segun la busqueda
  const filteredProducts = allProducts.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setOffset(0); // reinicia la paginacion al buscar
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setOffset(0); // reinicia la paginacion al cambiar categoria
  };

  const handleNextPage = () => {
    setOffset(prevOffset => prevOffset + limit);
  };

  const handlePreviousPage = () => {
    setOffset(prevOffset => Math.max(0, prevOffset - limit));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Todos Nuestros Productos
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4, gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
          <TextField
            label="Buscar producto"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ flexGrow: 1 }}
          />

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="category-select-label">Categoría</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={selectedCategory}
              label="Categoría"
              onChange={handleCategoryChange}
            >
              <MenuItem value="">
                <em>Todas</em>
              </MenuItem>
              {categoriesLoading ? (
                <MenuItem disabled>Cargando...</MenuItem>
              ) : categoriesError ? (
                <MenuItem disabled>Error</MenuItem>
              ) : (
                categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Box>

        {productsLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : productsError ? (
          <Alert severity="error">Error al cargar los productos: {productsError.message}</Alert>
        ) : (
          <>
            <Grid container spacing={4}>
              {filteredProducts.map((product) => (
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
                      p: 2
                    }}>
                      <CardMedia
                        component="img"
                        sx={{
                          maxHeight: '100%',
                          maxWidth: '100%',
                          objectFit: 'contain',
                        }}
                        image={product.images && product.images.length > 0 ? product.images[0] : PLACEHOLDER_IMAGE}
                        alt={product.title}
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
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
              <Button
                variant="contained"
                onClick={handlePreviousPage}
                disabled={offset === 0}
              >
                Anterior
              </Button>
              <Button
                variant="contained"
                onClick={handleNextPage}
                disabled={filteredProducts.length < limit}
              >
                Siguiente
              </Button>
            </Box>
          </>
        )}
      </Container>
      <Footer />
    </Box>
  );
};

export default ProductsPage;