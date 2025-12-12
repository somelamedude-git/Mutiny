import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://your-backend-api-url.com/api', // Replace with your actual backend URL
  // You can add other default settings here, like headers
});

export default apiClient;