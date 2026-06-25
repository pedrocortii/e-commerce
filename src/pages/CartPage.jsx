import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Avatar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CartContext } from "../contexts/CartContext";
import { translateProductTitle } from "../services/translator";

const PLACEHOLDER_IMAGE =
  'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="50" height="50"%3E%3Crect width="50" height="50" fill="%23e0e0e0"/%3E%3C/svg%3E';

const CartPage = () => {
  const {
    cart,
    incrementProduct,
    decrementProduct,
    eliminateProduct,
    emptyCart,
    total,
  } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    alert("¡Compra realizada con éxito! Gracias por tu compra.");
    emptyCart();
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Tu Carrito de Compras
        </Typography>

        {cart.length === 0 ? (
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              El carrito está vacío.
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to="/productos"
              sx={{ mt: 2 }}
            >
              Ver Productos
            </Button>
          </Box>
        ) : (
          <Box>
            <List>
              {cart.map((item) => (
                <ListItem
                  key={item.product.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                    gap: 2,
                    flexWrap: "wrap",
                  }}
                >
                  <Avatar
                    variant="square"
                    src={
                      item.product.images && item.product.images.length > 0
                        ? item.product.images[0]
                        : PLACEHOLDER_IMAGE
                    }
                    alt={item.product.title}
                    sx={{ width: 60, height: 60 }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = PLACEHOLDER_IMAGE;
                    }}
                  />
                  <ListItemText
                    primary={
                      <Typography variant="body1" fontWeight={600}>
                        {translateProductTitle(item.product.title)}
                      </Typography>
                    }
                    secondary={`$${item.product.price.toFixed(2)} c/u`}
                    sx={{ flexGrow: 1 }}
                  />

                  {/* controles de cantidad */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #ddd",
                      borderRadius: 1,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => decrementProduct(item.product.id)}
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Typography
                      sx={{
                        px: 1.5,
                        fontWeight: 600,
                        minWidth: 28,
                        textAlign: "center",
                      }}
                    >
                      {item.quantity}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => incrementProduct(item.product.id)}
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Box>

                  <Typography
                    variant="body1"
                    fontWeight={600}
                    sx={{ minWidth: 80, textAlign: "right" }}
                  >
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </Typography>

                  <IconButton
                    onClick={() => eliminateProduct(item.product.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 2 }} />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6">${total.toFixed(2)}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 3,
                gap: 2,
              }}
            >
              <Button variant="outlined" color="secondary" onClick={emptyCart}>
                Vaciar Carrito
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCheckout}
              >
                Finalizar Compra
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
