import axios from "axios";

const API_URL = "https://localhost:7107/api/Payment";

export const makePayment = async (paymentData) => {
  const response = await axios.post(API_URL, paymentData);

  return response.data;
};

export const getPayments = async (email) => {
  const response = await axios.get(`${API_URL}/${email}`);

  return response.data;
};
