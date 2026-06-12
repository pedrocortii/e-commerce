import React, { useContext } from 'react';
import { Container, Typography, Box, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Divider, Avatar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom'; // Import Link for "VER PRODUCTOS" button
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CartContext } from '../contexts/CartContext';

const CartPage = () => {
  const { cart, eliminateProduct, emptyCart, total } = useContext(CartContext);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Tu Carrito de Compras
        </Typography>

        {cart.length === 0 ? (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              El carrito está vacío.
            </Typography>
            <Button variant="contained" component={Link} to="/productos" sx={{ mt: 2 }}>
              Ver Productos
            </Button>
          </Box>
        ) : (
          <Box>
            <List>
              {cart.map((item) => (
                <ListItem key={item.product.id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    variant="square"
                    src={item.product.images && item.product.images.length > 0 ? item.product.images[0] : 'https://via.placeholder.com/50'}
                    alt={item.product.title}
                    sx={{ width: 50, height: 50, mr: 2 }}
                  />
                  <ListItemText
                    primary={
                      <Typography variant="h6" component="span">
                        {item.product.title}
                      </Typography>
                    }
                    secondary={`Cantidad: ${item.quantity} | $${item.product.price} cada uno`}
                    sx={{ flexGrow: 1 }}
                  />
                  <Typography variant="body1" sx={{ mr: 2 }}>
                    Subtotal: ${item.product.price * item.quantity}
                  </Typography>
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={() => eliminateProduct(item.product.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6">${total.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 2 }}>
              <Button variant="outlined" color="secondary" onClick={emptyCart}>
                Vaciar Carrito
              </Button>
              <Button variant="contained" color="primary">
                Finalizar Compra (WIP)
              </Button>
            </Box>
          </Box>
        )}
      </Container>
      <Footer />
    </Box>
  );
};

export default CartPage;
