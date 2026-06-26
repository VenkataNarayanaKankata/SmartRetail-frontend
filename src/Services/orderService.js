import axios from "axios";

const API_URL = "https://localhost:7107/api/Order";

export const placeOrder = async (orderData) => {
  const response = await axios.post(API_URL, orderData);

  return response.data;
};

export const getOrders = async (email) => {
  const response = await axios.get(`${API_URL}/${email}`);

  return response.data;
};

export const getOrderDetails = async (orderId) => {
  const response = await axios.get(`${API_URL}/details/${orderId}`);

  return response.data;
};
export const deleteOrder = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);

  return response.data;
};
export const updateOrderStatus = async (id, status) => {
  const response = await axios.put(`${API_URL}/status/${id}?status=${status}`);

  return response.data;
};
