import axios from "axios";

const API_URL = "https://localhost:7107/api/Wishlist";

export const addToWishlist = async (wishlistData) => {
  const response = await axios.post(API_URL, wishlistData);

  return response.data;
};

export const getWishlist = async (email) => {
  const response = await axios.get(`${API_URL}/${email}`);

  return response.data;
};

export const removeWishlistItem = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);

  return response.data;
};
