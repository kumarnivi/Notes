import axios from "axios";

// in production, there's no localhost so we have to make this dynamic
const BASE_URL = import.meta.env.MODE === "development" ? "https://mern-thinkboard-e5qe.onrender.com/api" : "/api";
// const BASE_URL = "https://mern-thinkboard-e5qe.onrender.com/api"
const api = axios.create({
  baseURL: BASE_URL,    
   withCredentials: true
});

export default api;
