import API from "./api";

export const getAll = () => API.get("/records");
export const getById = (id) => API.get(`/records/${id}`);
export const createRecord = (data) => API.post("/records", data);
export const updateRecord = (id, data) => API.put(`/records/${id}`, data);
export const deleteRecord = (id) => API.delete(`/records/${id}`);