import { useEffect, useState } from "react";
import { Alert, Box, Button, CssBaseline, Stack, TextField, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  fetchTodos,
  fetchPorId,
  crearAprendiz,
  actualizarAprendiz,
  eliminarAprendiz,
} from "../service/aprendizService";
import FormularioAprendiz from "../componentes/FormularioAprendiz";
import TablaAprendiz from "../componentes/TablaAprendiz";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#22d3ee" },
    background: { default: "#0b1220", paper: "#111827" },
  },
});

const formVacio = {
  nombre: "",
  apellido: "",
  email: "",
  telefono: "",
  direccion: "",
  fecha_nacimiento: "",
  genero: "",
  programa: "",
  ficha: "",
  numero_documento: "",
};

const obtenerMensajeError = (e) => {
  const errores = e.response?.data?.errors;
  if (errores) return Object.values(errores).flat().join(" ");
  return e.response?.data?.message || "No se pudo conectar con el servidor";
};

const PrincipalView = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState(formVacio);
  const [editandoId, setEditandoId] = useState(null);
  const [idFiltro, setIdFiltro] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  const cargarTodos = async () => {
    try {
      setLoading(true);
      setData(await fetchTodos());
    } catch (e) {
      setData([]);
      setMensaje({ tipo: "error", texto: obtenerMensajeError(e) });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarTodos();
  }, []);

  const buscarPorId = async () => {
    if (!idFiltro) return;
    try {
      setLoading(true);
      const aprendiz = await fetchPorId(idFiltro);
      setData([aprendiz]);
      setMensaje(null);
    } catch (e) {
      setData([]);
      setMensaje({
        tipo: "error",
        texto: e.response?.status === 404 ? "No existe un aprendiz con ese ID" : obtenerMensajeError(e),
      });
    } finally {
      setLoading(false);
    }
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setForm(formVacio);
  };

  const guardar = async () => {
    try {
      setLoading(true);
      if (editandoId) {
        await actualizarAprendiz(editandoId, form);
        setMensaje({ tipo: "success", texto: "Aprendiz actualizado" });
      } else {
        await crearAprendiz(form);
        setMensaje({ tipo: "success", texto: "Aprendiz creado" });
      }
      cancelarEdicion();
      await cargarTodos();
    } catch (e) {
      setMensaje({ tipo: "error", texto: obtenerMensajeError(e) });
    } finally {
      setLoading(false);
    }
  };

  const editar = (aprendiz) => {
    setEditandoId(aprendiz.id);
    setForm({
      nombre: aprendiz.nombre,
      apellido: aprendiz.apellido,
      email: aprendiz.email,
      telefono: aprendiz.telefono,
      direccion: aprendiz.direccion,
      fecha_nacimiento: aprendiz.fecha_nacimiento?.slice(0, 10) ?? "",
      genero: aprendiz.genero,
      programa: aprendiz.programa,
      ficha: aprendiz.ficha,
      numero_documento: aprendiz.numero_documento,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const eliminar = async (id) => {
    if (!window.confirm("¿Eliminar este aprendiz?")) return;
    try {
      setLoading(true);
      await eliminarAprendiz(id);
      setMensaje({ tipo: "success", texto: "Aprendiz eliminado" });
      if (editandoId === id) cancelarEdicion();
      await cargarTodos();
    } catch (e) {
      setMensaje({ tipo: "error", texto: obtenerMensajeError(e) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ maxWidth: 1300, mx: "auto", p: { xs: 2, md: 4 } }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="center" sx={{ mb: 3 }}>
          <Typography variant="h5" sx={{ flex: 1, fontWeight: 700 }}>
            Gestión de aprendiz
          </Typography>
          <TextField
            size="small"
            label="ID"
            value={idFiltro}
            onChange={(e) => setIdFiltro(e.target.value)}
            sx={{ width: 120 }}
          />
          <Button variant="contained" color="secondary" onClick={buscarPorId} disabled={loading || !idFiltro}>
            BUSCAR POR ID
          </Button>
          <Button variant="contained" onClick={cargarTodos} disabled={loading}>
            {loading ? "CARGANDO..." : "VER TODOS"}
          </Button>
        </Stack>

        {mensaje && (
          <Alert severity={mensaje.tipo} onClose={() => setMensaje(null)} sx={{ mb: 2 }}>
            {mensaje.texto}
          </Alert>
        )}

        <FormularioAprendiz
          form={form}
          setForm={setForm}
          onGuardar={guardar}
          onCancelar={cancelarEdicion}
          editando={editandoId !== null}
          loading={loading}
        />

        <TablaAprendiz data={data} onEditar={editar} onEliminar={eliminar} loading={loading} />
      </Box>
    </ThemeProvider>
  );
};

export default PrincipalView;