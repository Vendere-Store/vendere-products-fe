import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:4000/',
  headers: {
    'Content-Type': 'application/json'
  }
});

http.interceptors.request.use(
  (config) => {
    // Assume you store your token in localStorage or get it from some auth service
    // You should replace `localStorage.getItem('token')` with your token retrieval logic
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle global response errors
http.interceptors.response.use(
  (response) => {
    // console.log('response intercept', response.data);
    // Handle response data here
    return response;
  },
  (error) => {
    // Handle errors
    if (error.response && error.response.status === 401) {
      // Redirect to login or perform any other action when user is unauthorized
    }
    return Promise.reject(error);
  }
);

export default http;
