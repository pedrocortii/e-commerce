const BASE_URL = 'https://api.escuelajs.co/api/v1';

export const getProducts = async (limit = 10, offset = 0) => {
  try {
    const response = await fetch(`${BASE_URL}/products?limit=${limit}&offset=${offset}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/categories`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getProductsByCategory = async (categoryId, limit = 10, offset = 0) => {
  try {
    const response = await fetch(`${BASE_URL}/categories/${categoryId}/products?limit=${limit}&offset=${offset}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching products for category ${categoryId}:`, error);
    throw error;
  }
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const loginUser = async (email, password) => {
  if (!emailRegex.test(email)) {
    return { success: false };
  }
  const name = email.split('@')[0];
  console.log("Simulating login for:", email);
  return { success: true, user: { email, name } };
};

export const registerUser = async (name, email, password) => {
  if (!emailRegex.test(email)) {
    return { success: false };
  }
  console.log("Simulating registration for:", name, email);
  return { success: true, user: { name, email } };
};