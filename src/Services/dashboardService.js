import axios from "axios";

const API_URL = "https://localhost:7107/api/Dashboard";

export const getDashboardStats = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};
