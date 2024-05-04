import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: false,
});
instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});
export default instance;
