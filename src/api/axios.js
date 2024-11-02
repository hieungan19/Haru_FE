import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

// Đặt header cho mọi yêu cầu
api.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default api;
