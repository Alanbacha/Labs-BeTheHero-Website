import axios from "axios";

const api = axios.create({
	baseURL: process.env.apiBaseURL || "https://labs-be-the-hero-backend.herokuapp.com"
});

export default api;
