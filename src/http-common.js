import axios from "axios";

const http = axios.create({
  baseURL: "https://6700e0eeb52042b542d62489.mockapi.io/people/",
  headers: {
    "Content-type": "application/json"
  }
});

export default http;
