import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, Alert } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null); // null, 'success', 'error'

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus(null); // Clear previous status

    if (!name || !email || !subject || !message) {
      setStatus('error');
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      setStatus('success');
      // Optionally clear form fields
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 1000);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container maxWidth="sm" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Contáctanos
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Tu Nombre"
            name="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Tu Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="subject"
            label="Asunto"
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="message"
            label="Tu Mensaje"
            name="message"
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          {status === 'success' && (
            <Alert severity="success" sx={{ mt: 2 }}>
              ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.
            </Alert>
          )}
          {status === 'error' && (
            <Alert severity="error" sx={{ mt: 2 }}>
              Por favor, completa todos los campos del formulario.
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Enviar Mensaje
          </Button>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default ContactPage;
