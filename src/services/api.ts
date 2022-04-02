import Axios from "axios";

const api = Axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
