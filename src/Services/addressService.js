import axios from "axios";

const API_URL = "https://localhost:7107/api/Address";

export const saveAddress = async (address) => {
  const response = await axios.post(API_URL, address);

  return response.data;
};

export const getAddress = async (email) => {
  const response = await axios.get(`${API_URL}/${email}`);

  return response.data;
};
