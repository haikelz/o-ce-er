import axios from "axios";

export const api = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? import.meta.env.VITE_API_URL_DEVELOPMENT
      : import.meta.env.VITE_API_URL_PRODUCTION,
});
