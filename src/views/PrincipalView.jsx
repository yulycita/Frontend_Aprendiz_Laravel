import { useEffect, useState } from "react";
import { Alert, Box, Button, CssBaseline, Stack, TextField } from "@mui/material";
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
    mode: "light",
    primary: { main: "#d624c1", dark: "#872991", contrastText: "#ffffff" },
    secondary: { main: "#e8753d", dark: "#c55625", contrastText: "#ffffff" },
    background: { default: "#f4f7fb", paper: "#ffffff" },
    text: { primary: "#172033", secondary: "#64748b" },
    divider: "#e2e8f0",
  },
  typography: {
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h5: { fontWeight: 800, letterSpacing: "-0.025em" },
    body2: { lineHeight: 1.6 },
    button: { fontWeight: 700, textTransform: "none" },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none", boxShadow: "0 8px 24px rgba(23, 32, 51, 0.06)" },
      },
    },
    MuiTextField: {
      defaultProps: { variant: "outlined" },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          "& fieldset": { borderColor: "#d7e0eb" },
          "&:hover fieldset": { borderColor: "#9aaac0" },
          "&.Mui-focused fieldset": { borderWidth: 2 },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 9, paddingInline: 18, minHeight: 40 },
      },
    },
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
              sx={{ width: { xs: "100%", sm: 150 } }}
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

        <TablaAprendiz data={data} onEditar={editar} onEliminar={eliminar} loading={loading} />
      </Box>
    </ThemeProvider>
  );
};

export default PrincipalView;