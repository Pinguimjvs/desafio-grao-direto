import axios from "axios";

const api = axios.create({
  baseURL: "https://8cfyjnkvv3.execute-api.us-east-1.amazonaws.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
