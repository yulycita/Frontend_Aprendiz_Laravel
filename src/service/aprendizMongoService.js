import axios from "axios";

export const API_BASE_MONGO = "http://127.0.0.1:8000/api/aprendiz-mongo";

export const fetchTodosMongo = async () => {
  const res = await axios.get(API_BASE_MONGO);
  return res.data || [];
};

export const fetchPorIdMongo = async (id) => {
  const res = await axios.get(`${API_BASE_MONGO}/${id}`);
  return res.data;
};

export const crearAprendizMongo = async (aprendiz) => {
  const res = await axios.post(API_BASE_MONGO, aprendiz);
  return res.data;
};

export const actualizarAprendizMongo = async (id, aprendiz) => {
  const res = await axios.put(`${API_BASE_MONGO}/${id}`, aprendiz);
  return res.data;
};

export const eliminarAprendizMongo = async (id) => {
  const res = await axios.delete(`${API_BASE_MONGO}/${id}`);
  return res.data;
};
