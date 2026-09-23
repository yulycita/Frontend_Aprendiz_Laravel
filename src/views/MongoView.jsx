import { useEffect, useState } from "react";
import { Alert, Box, Button, CssBaseline, Stack, TextField } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../theme";
import {
  fetchTodosMongo,
  fetchPorIdMongo,
  crearAprendizMongo,
  actualizarAprendizMongo,
  eliminarAprendizMongo,
} from "../service/aprendizMongoService";
import FormularioAprendiz from "../componentes/FormularioAprendiz";
import TablaAprendizMongo from "../componentes/TablaAprendizMongo";

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

const MongoView = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState(formVacio);
  const [editandoId, setEditandoId] = useState(null);
  const [idFiltro, setIdFiltro] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  const cargarTodos = async () => {
    try {
      setLoading(true);
      setData(await fetchTodosMongo());
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
      const aprendiz = await fetchPorIdMongo(idFiltro);
      setData([aprendiz]);
      setMensaje(null);
    } catch (e) {
      setData([]);
      setMensaje({
        tipo: "error",
        texto: e.response?.status === 404 ? "No existe un documento con ese ID" : obtenerMensajeError(e),
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
        await actualizarAprendizMongo(editandoId, form);
        setMensaje({ tipo: "success", texto: "Documento actualizado en Mongo" });
      } else {
        await crearAprendizMongo(form);
        setMensaje({ tipo: "success", texto: "Documento creado en Mongo" });
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
    setEditandoId(aprendiz._id);
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
    if (!window.confirm("¿Eliminar este documento de Mongo?")) return;
    try {
      setLoading(true);
      await eliminarAprendizMongo(id);
      setMensaje({ tipo: "success", texto: "Documento eliminado" });
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
      <Box sx={{ maxWidth: 1300, mx: "auto", p: { xs: 2, sm: 3, md: 5 } }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 2, md: 3 }}
          alignItems={{ xs: "stretch", md: "center" }}
          sx={{ mb: 4 }}
        >
          <Box sx={{ flex: 1 }} />
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <TextField
              size="small"
              label="Buscar por ID"
              value={idFiltro}
              onChange={(e) => setIdFiltro(e.target.value)}
              sx={{ width: { xs: "100%", sm: 220 } }}
            />
            <Button variant="contained" color="secondary" onClick={buscarPorId} disabled={loading || !idFiltro}>
              Buscar
            </Button>
            <Button variant="contained" onClick={cargarTodos} disabled={loading}>
              {loading ? "Cargando..." : "Ver todos"}
            </Button>
          </Stack>
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

        <TablaAprendizMongo data={data} onEditar={editar} onEliminar={eliminar} loading={loading} />
      </Box>
    </ThemeProvider>
  );
};

export default MongoView;
