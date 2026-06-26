import axios from "axios";

const API_URL = "https://localhost:7107/api/Product";

// GET ALL PRODUCTS
export const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// GET PRODUCT BY ID
export const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// ADD PRODUCT
export const addProduct = async (productData) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    API_URL,
    productData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// UPDATE PRODUCT
export const updateProduct = async (id, productData) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API_URL}/${id}`,
    productData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// DELETE PRODUCT
export const deleteProduct = async (id) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(
    `${API_URL}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};