import React from 'react';
import { Box, Typography, Link, Container, Grid } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 3, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="inherit" gutterBottom>
              MegaStore
            </Typography>
            <Typography variant="body2" color="inherit">
              Tu tienda online de electrónica y tecnología.
            </Typography>
            <Typography variant="body2" color="inherit">
              © {new Date().getFullYear()} MegaStore. Todos los derechos reservados.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="inherit" gutterBottom>
              Datos de Contacto
            </Typography>
            <Typography variant="body2" color="inherit">
              Email: contacto@megastore.com
            </Typography>
            <Typography variant="body2" color="inherit">
              Teléfono: +54 11 2000 3000
            </Typography>
            <Typography variant="body2" color="inherit">
              Dirección: Av. Tecnológica 123, Buenos Aires, Argentina
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="inherit" gutterBottom>
              Enlaces Rápidos
            </Typography>
            <Link href="/" color="inherit" display="block" variant="body2">
              Home
            </Link>
            <Link href="/productos" color="inherit" display="block" variant="body2">
              Productos
            </Link>
            <Link href="/contacto" color="inherit" display="block" variant="body2">
              Contacto
            </Link>
            
          </Grid>
        </Grid>
        <Box mt={3} sx={{ borderTop: '1px solid rgba(255,255,255,0.2)', pt: 2 }}>
          <Typography variant="body2" color="inherit" align="center">
            {'Copyright © '} MegaStore {new Date().getFullYear()}. Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
