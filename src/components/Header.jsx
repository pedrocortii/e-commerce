import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Stack,
  Badge,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import StoreIcon from "@mui/icons-material/Store";
import HomeIcon from "@mui/icons-material/Home";
import { UserContext } from "../contexts/UserContext";
import { CartContext } from "../contexts/CartContext";
import useCategories from "../hooks/useCategories";

const Header = () => {
  const { user, logout } = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorEl, setAnchorEl] = useState(null);
  const [categoriesAnchor, setCategoriesAnchor] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleCategoriesOpen = (event) =>
    setCategoriesAnchor(event.currentTarget);
  const handleCategoriesClose = () => setCategoriesAnchor(null);

  const handleLogout = () => {
    logout();
    navigate("/");
    handleClose();
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "#0D6EFF" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* logo a la izquierda */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            color: "inherit",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <StoreIcon />
          MegaStore
        </Typography>

        {isMobile ? (
          <>
            <IconButton size="large" color="inherit" onClick={handleMenu}>
              <MenuIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={handleClose} component={Link} to="/">
                Home
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/productos">
                Productos
              </MenuItem>
              <MenuItem onClick={handleCategoriesOpen}>Categorías</MenuItem>
              <Menu
                anchorEl={categoriesAnchor}
                open={Boolean(categoriesAnchor)}
                onClose={handleCategoriesClose}
              >
                {categoriesLoading ? (
                  <MenuItem disabled>Cargando...</MenuItem>
                ) : categoriesError ? (
                  <MenuItem disabled>Error</MenuItem>
                ) : (
                  categories.map((cat) => (
                    <MenuItem
                      key={cat.id}
                      onClick={handleCategoriesClose}
                      component={Link}
                      to={`/productos?category=${cat.id}`}
                    >
                      {cat.name}
                    </MenuItem>
                  ))
                )}
              </Menu>
              <MenuItem onClick={handleClose} component={Link} to="/contacto">
                Contacto
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/carrito">
                Carrito ({cart.length})
              </MenuItem>
              {user
                ? [
                    <MenuItem
                      key="profile"
                      onClick={handleClose}
                      component={Link}
                      to="/perfil"
                    >
                      Perfil
                    </MenuItem>,
                    <MenuItem key="logout" onClick={handleLogout}>
                      Cerrar sesión
                    </MenuItem>,
                  ]
                : [
                    <MenuItem
                      key="login"
                      onClick={handleClose}
                      component={Link}
                      to="/login"
                    >
                      Iniciar sesión
                    </MenuItem>,
                    <MenuItem
                      key="register"
                      onClick={handleClose}
                      component={Link}
                      to="/registro"
                    >
                      Registrarse
                    </MenuItem>,
                  ]}
            </Menu>
          </>
        ) : (
          /* nav central con el icono de la casa incluido */
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ flex: 1, justifyContent: "center" }}
          >
            <IconButton color="inherit" component={Link} to="/">
              <HomeIcon />
            </IconButton>
            <Button
              color="inherit"
              component={Link}
              to="/productos"
              sx={{ fontWeight: 500 }}
            >
              Productos
            </Button>
            <Box>
              <Button
                color="inherit"
                onClick={handleCategoriesOpen}
                sx={{ fontWeight: 500 }}
              >
                Categorías
              </Button>
              <Menu
                anchorEl={categoriesAnchor}
                open={Boolean(categoriesAnchor)}
                onClose={handleCategoriesClose}
                MenuListProps={{ onMouseLeave: handleCategoriesClose }}
              >
                {categoriesLoading ? (
                  <MenuItem disabled>Cargando...</MenuItem>
                ) : categoriesError ? (
                  <MenuItem disabled>Error</MenuItem>
                ) : (
                  categories.map((cat) => (
                    <MenuItem
                      key={cat.id}
                      onClick={handleCategoriesClose}
                      component={Link}
                      to={`/productos?category=${cat.id}`}
                    >
                      {cat.name}
                    </MenuItem>
                  ))
                )}
              </Menu>
            </Box>
            <Button
              color="inherit"
              component={Link}
              to="/contacto"
              sx={{ fontWeight: 500 }}
            >
              Contacto
            </Button>
          </Stack>
        )}

        {/* carrito y usuario a la derecha */}
        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton
            color="inherit"
            component={Link}
            to="/carrito"
            size="large"
          >
            <Badge badgeContent={cart.length} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          {user ? (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/perfil"
                sx={{ fontWeight: 500 }}
              >
                {user.name || user.email}
              </Button>
              <Button
                color="inherit"
                onClick={handleLogout}
                sx={{ fontWeight: 500 }}
              >
                Salir
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/login"
                sx={{ fontWeight: 500 }}
              >
                Login
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/registro"
                sx={{
                  fontWeight: 500,
                  border: "1px solid rgba(255,255,255,0.5)",
                  borderRadius: 1,
                  px: 2,
                }}
              >
                Registrarse
              </Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
