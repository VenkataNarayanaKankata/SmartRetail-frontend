import axios from "axios";

const API_URL = "https://localhost:7107/api/Category";

// GET ALL
export const getCategories = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// GET BY ID
export const getCategoryById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// ADD
export const addCategory = async (category) => {
  const response = await axios.post(API_URL, category);
  return response.data;
};

// UPDATE
export const updateCategory = async (id, category) => {
  const response = await axios.put(`${API_URL}/${id}`, category);
  return response.data;
};

// DELETE
export const deleteCategory = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};