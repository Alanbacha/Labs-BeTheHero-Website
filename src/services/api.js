import axios from "axios";

const api = axios.create({
	baseURL: process.env.apiBaseURL || "http://localhost:3333"
});

export default api;
