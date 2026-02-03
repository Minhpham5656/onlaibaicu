import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

export const fetchTests = () => api.get("/tests");
export const fetchQuestions = (id) => api.get(`/tests/${id}`);
export const submitResult = (payload) => api.post("/results", payload);
export const uploadTestFile = (formData) => api.post("/upload", formData);
export const deleteTest = (id) => api.delete(`/tests/${id}`);

export default api;
