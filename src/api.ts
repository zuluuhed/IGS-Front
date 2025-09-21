import axios from "axios";

const USERNAME = "hassan";
const PASSWORD = "123";
const token = btoa(`${USERNAME}:${PASSWORD}`);

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// همیشه هدر Authorization رو قبل از ارسال اضافه کن
api.interceptors.request.use((config) => {
  config.headers.Authorization = `Basic ${token}`;
  return config;
});

export default api;
