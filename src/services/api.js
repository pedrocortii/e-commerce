const BASE_URL = 'https://api.escuelajs.co/api/v1'; // Using the Platzi API as requested

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

// Placeholder for user-related API calls if needed (login, register)
export const loginUser = async (email, password) => {
    // This is a placeholder. In a real app, you'd send credentials to an auth endpoint.
    console.log("Simulating login for:", email);
    return { success: true, user: { email, name: "Simulated User" } };
};

export const registerUser = async (name, email, password) => {
    // This is a placeholder.
    console.log("Simulating registration for:", name, email);
    return { success: true, user: { name, email } };
};
