import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useProducts from "../hooks/useProducts";
import { translateProductTitle } from "../services/translator";

const PLACEHOLDER_IMAGE =
  'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect width="200" height="200" fill="%23e0e0e0"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-family="sans-serif" font-size="14"%3ESin imagen%3C/text%3E%3C/svg%3E';

const HomePage = () => {
  const { products, loading, error } = useProducts("all", null, null, 20);
  const randomProducts = [...products]
    .sort(() => Math.random() - 0.5)
    .slice(0, 8);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: 6,
          textAlign: "center",
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Descubre la mejor tienda en línea
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Productos de calidad a precios accesibles
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 5 }}>
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, mb: 1, color: "#0D6EFF" }}
          >
            Sección Destacada
          </Typography>
          <Typography variant="body2" sx={{ color: "#666", mb: 4 }}>
            Descubre las últimas novedades y ofertas exclusivas de nuestra
            tienda.
          </Typography>
        </Box>

        <Typography variant="h6" sx={{ fontWeight: 600, mb: 4, color: "#333" }}>
          Nuestros Productos
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">
            Error al cargar los productos: {error.message}
          </Alert>
        ) : (
          <Grid container spacing={3}>
            {randomProducts.map((product) => (
              <Grid
                item
                key={product.id}
                xs={12}
                sm={6}
                md={3}
                sx={{ display: "flex" }}
              >
                <Card
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0px 12px 24px rgba(13, 110, 255, 0.15)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      height: 180,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      bgcolor: "#f8f9fa",
                      p: 1,
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                      }}
                      image={product.images?.[0] || PLACEHOLDER_IMAGE}
                      alt={translateProductTitle(product.title)}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = PLACEHOLDER_IMAGE;
                      }}
                    />
                  </Box>
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box sx={{ flexGrow: 1, mb: 1 }}>
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        color="#222"
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          lineHeight: 1.4,
                          minHeight: "2.8em",
                        }}
                      >
                        {translateProductTitle(product.title)}
                      </Typography>
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{ color: "#0D6EFF", fontWeight: 700 }}
                    >
                      ${product.price.toFixed(2)}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2, pt: 0 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      component={Link}
                      to={`/producto/${product.id}`}
                      sx={{ fontSize: "0.75rem", fontWeight: 700 }}
                    >
                      Ver Detalle
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
      <Footer />
    </Box>
  );
};

export default HomePage;
