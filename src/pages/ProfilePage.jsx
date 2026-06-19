import React, { useContext } from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { UserContext } from '../contexts/UserContext';
import { CartContext } from '../contexts/CartContext';

const ProfilePage = () => {
  const { user } = useContext(UserContext);
  const { cart } = useContext(CartContext);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container maxWidth="sm" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Perfil de Usuario
        </Typography>

        {user ? (
          <Paper elevation={3} sx={{ p: 4, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Nombre: {user.name}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Email: {user.email}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Productos en carrito: {cart.length}
            </Typography>
          </Paper>
        ) : (
          <Paper elevation={3} sx={{ p: 4, mt: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              No has iniciado sesión.
            </Typography>
            <Typography variant="body1">
              Por favor, <Link to="/login">inicia sesión</Link> o <Link to="/registro">regístrate</Link> para ver tu perfil.
            </Typography>
          </Paper>
        )}
      </Container>
      <Footer />
    </Box>
  );
};

export default ProfilePage;