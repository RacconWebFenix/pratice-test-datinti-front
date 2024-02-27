import axios from "axios";

export const api = axios.create({
  baseURL: "https://pratice-test-davinti-production.up.railway.app/",
  headers: {
    Authorization: {
      "Access-Control-Allow-Origin": "http://localhost:5173/",
    },
  },
});
