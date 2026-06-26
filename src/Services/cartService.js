import axios from "axios";

const API_URL = "https://localhost:7107/api/Cart";

export const addToCart = async (cartData) => {

  const response = await axios.post(
    API_URL,
    cartData
  );

  return response.data;
};

export const getUserCart = async (email) => {

  const response = await axios.get(
    `${API_URL}/${email}`
  );

  return response.data;
};

export const updateCartItem = async (id, updatedData) => {

  const response = await axios.put(
    `${API_URL}/${id}`,
    updatedData
  );

  return response.data;
};


export const deleteCartItem = async (id) => {

  const response = await axios.delete(
    `${API_URL}/${id}`
  );

  return response.data;
};