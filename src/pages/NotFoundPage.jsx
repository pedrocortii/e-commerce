import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const NotFoundPage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container maxWidth="sm" sx={{ mt: 4, mb: 4, flexGrow: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700, color: '#0D6EFF' }}>
          404
        </Typography>
        <Typography variant="h5" gutterBottom>
          Página no encontrada
        </Typography>
        <Typography variant="body1" sx={{ color: '#666', mb: 4 }}>
          La página que estás buscando no existe o fue movida.
        </Typography>
        <Button variant="contained" component={Link} to="/" sx={{ alignSelf: 'center' }}>
          Volver al Home
        </Button>
      </Container>
      <Footer />
    </Box>
  );
};

export default NotFoundPage;