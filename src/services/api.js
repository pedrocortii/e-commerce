const BASE_URL = "https://api.escuelajs.co/api/v1";

// usuarios registrados en memoria (se borra al recargar la pagina)
const registeredUsers = [];

export const getProducts = async (limit = 10, offset = 0) => {
  try {
    const response = await fetch(
      `${BASE_URL}/products?limit=${limit}&offset=${offset}`
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/categories`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getProductsByCategory = async (
  categoryId,
  limit = 10,
  offset = 0
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/categories/${categoryId}/products?limit=${limit}&offset=${offset}`
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching products for category ${categoryId}:`, error);
    throw error;
  }
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const loginUser = async (email, password) => {
  if (!emailRegex.test(email))
    return { success: false, error: "Email inválido." };

  const user = registeredUsers.find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!user)
    return { success: false, error: "Email o contraseña incorrectos." };

  // devolvemos el usuario sin la contraseña
  return { success: true, user: { name: user.name, email: user.email } };
};

export const registerUser = async (name, email, password) => {
  if (!emailRegex.test(email))
    return { success: false, error: "Email inválido." };

  const existe = registeredUsers.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
  if (existe)
    return { success: false, error: "Ya existe una cuenta con ese email." };

  // guarda el usuario en memoria
  registeredUsers.push({ name, email, password });

  return { success: true, user: { name, email } };
};
