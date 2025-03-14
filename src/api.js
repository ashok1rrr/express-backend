import axios from 'axios';

const api = axios.create({
  baseURL: 'https://reqres.in/api', // Using ReqRes public API
});

export default api;