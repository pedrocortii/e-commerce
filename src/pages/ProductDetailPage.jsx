import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
  CardMedia,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useProducts from "../hooks/useProducts";
import { CartContext } from "../contexts/CartContext";
import { translateProductTitle } from "../services/translator";

const PLACEHOLDER_IMAGE =
  'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect width="400" height="400" fill="%23e0e0e0"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-family="sans-serif" font-size="20"%3ESin imagen%3C/text%3E%3C/svg%3E';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading, error } = useProducts("single", id);
  const product = products;
  const { addProduct } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (product) {
      addProduct(product, quantity);
      alert(
        `${quantity} x ${translateProductTitle(
          product.title
        )} agregado al carrito.`
      );
      setQuantity(1);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Button variant="outlined" sx={{ mb: 2 }} onClick={() => navigate(-1)}>
          Volver
        </Button>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">
            Error al cargar el producto: {error.message}
          </Alert>
        ) : product ? (
          <Box>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
              <Box
                sx={{
                  width: { xs: "100%", md: "60%" },
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    height: "auto",
                    maxWidth: "100%",
                    objectFit: "contain",
                    borderRadius: 2,
                  }}
                  image={
                    product.images && product.images.length > 0
                      ? product.images[0]
                      : PLACEHOLDER_IMAGE
                  }
                  alt={translateProductTitle(product.title)}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = PLACEHOLDER_IMAGE;
                  }}
                />
              </Box>
            </Box>

            <Box sx={{ maxWidth: 600, mx: "auto" }}>
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{ fontWeight: 700, color: "#333" }}
              >
                {translateProductTitle(product.title)}
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: "#0D6EFF", fontWeight: 700, mb: 2 }}
              >
                ${product.price.toFixed(2)}
              </Typography>
              <Box sx={{ my: 3, pb: 2, borderBottom: "1px solid #eee" }}>
                <Typography
                  variant="body1"
                  sx={{ color: "#555", lineHeight: 1.8 }}
                >
                  {product.description}
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ color: "#666", fontWeight: 500, mb: 3 }}
              >
                <strong>Categoría:</strong>{" "}
                {product.category ? product.category.name : "N/A"}
              </Typography>

              {/* selector de cantidad */}
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
              >
                <Typography variant="body1" fontWeight={600}>
                  Cantidad:
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #ddd",
                    borderRadius: 1,
                  }}
                >
                  <Button
                    size="small"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    sx={{ minWidth: 36 }}
                  >
                    <RemoveIcon fontSize="small" />
                  </Button>
                  <Typography
                    sx={{
                      px: 2,
                      fontWeight: 600,
                      minWidth: 32,
                      textAlign: "center",
                    }}
                  >
                    {quantity}
                  </Typography>
                  <Button
                    size="small"
                    onClick={() => setQuantity((q) => q + 1)}
                    sx={{ minWidth: 36 }}
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Total: ${(product.price * quantity).toFixed(2)}
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleAddToCart}
                sx={{ py: 1.5, fontWeight: 600, fontSize: "1rem" }}
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
