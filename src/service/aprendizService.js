import axios from "axios";

export const API_BASE = "https://banckend-laravel.onrender.com/api/aprendiz";

export const fetchTodos = async () => {
  const res = await axios.get(API_BASE);
  return res.data || [];
};

export const fetchPorId = async (id) => {
  const res = await axios.get(`${API_BASE}/${id}`);
  return res.data;
};

export const crearAprendiz = async (aprendiz) => {
  const res = await axios.post(API_BASE, aprendiz);
  return res.data;
};

export const actualizarAprendiz = async (id, aprendiz) => {
  const res = await axios.put(`${API_BASE}/${id}`, aprendiz);
  return res.data;
};

export const eliminarAprendiz = async (id) => {
  const res = await axios.delete(`${API_BASE}/${id}`);
  return res.data;
};