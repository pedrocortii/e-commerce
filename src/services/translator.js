const translations = {
  // Common tech terms
  'Wireless': 'Inalámbrico',
  'Gaming': 'Gaming',
  'Controller': 'Control',
  'Headphone': 'Auricular',
  'Headphones': 'Auriculares',
  'Earbuds': 'Auriculares',
  'Over-Ear': 'Over-Ear',
  'Comfort-Fit': 'Cómodo',
  'Mouse': 'Ratón',
  'Keyboard': 'Teclado',
  'Monitor': 'Monitor',
  'Laptop': 'Portátil',
  'Camera': 'Cámara',
  'Speaker': 'Altavoz',
  'Charger': 'Cargador',
  'Cable': 'Cable',
  'Adapter': 'Adaptador',
  'Case': 'Funda',
  'Stand': 'Soporte',
  'Sleek': 'Elegante',
  'Classic': 'Clásico',
  'Premium': 'Premium',
  'Pro': 'Pro',
  'Max': 'Max',
  'Ultra': 'Ultra',
  'HD': 'HD',
  '4K': '4K',
  'White': 'Blanco',
  'Black': 'Negro',
  'Blue': 'Azul',
  'Red': 'Rojo',
  'Green': 'Verde',
  'Silver': 'Plata',
  'Gold': 'Oro',
  'Rose': 'Rosa',
  'Orange': 'Naranja',
  'Pink': 'Rosa',
  'Purple': 'Púrpura',
  'Gray': 'Gris',
  'Grey': 'Gris',
  'Inked': 'Con Tinta',
  'Set': 'Set',
  '&': 'y',
};

export const translateProductTitle = (title) => {
  if (!title) return title;

  let translated = title;

  Object.keys(translations).forEach(english => {
    const regex = new RegExp(`\\b${english}\\b`, 'gi');
    translated = translated.replace(regex, translations[english]);
  });

  return translated;
};
