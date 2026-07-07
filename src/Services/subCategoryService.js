import axios from "axios";

const API_URL = "https://localhost:7107/api/SubCategory";

// GET ALL
export const getSubCategories = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// GET BY ID
export const getSubCategoryById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// ADD
export const addSubCategory = async (subCategory) => {
  const response = await axios.post(API_URL, subCategory);
  return response.data;
};

// UPDATE
export const updateSubCategory = async (id, subCategory) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    subCategory
  );

  return response.data;
};

// DELETE
export const deleteSubCategory = async (id) => {
  const response = await axios.delete(
    `${API_URL}/${id}`
  );

  return response.data;
};