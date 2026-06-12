import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './routes/AppRoutes'
import { UserProvider } from './contexts/UserContext';
import { CartProvider } from './contexts/CartContext';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme'; // Import the custom theme

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <UserProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </UserProvider>
    </ThemeProvider>
  </StrictMode>,
)

