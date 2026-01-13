import axios from "axios";

const api = axios.create({
  baseURL:  "http://localhost:8000/api",
  withCredentials: true, // Include cookies in requests
});

export default api;
// import.meta.env.VITE_API_URL ||