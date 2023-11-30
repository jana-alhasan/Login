import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/auth/login';

export const fetchLogin = async (credentials) => {
  try {
    const response = await axios.post(API_URL, credentials);
    return response;
  } catch (error) {
    throw new Error('Error during login request');
  }
};
