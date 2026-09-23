import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";

const campos = [
  { name: "nombre", label: "Nombre" },
  { name: "apellido", label: "Apellido" },
  { name: "numero_documento", label: "Número de documento" },
  { name: "fecha_nacimiento", label: "Fecha de nacimiento", type: "date" },
  { name: "genero", label: "Género" },
  { name: "email", label: "Email", type: "email" },
  { name: "telefono", label: "Teléfono" },
  { name: "direccion", label: "Dirección" },
  { name: "programa", label: "Programa" },
  { name: "ficha", label: "Ficha" },
];

const FormularioAprendiz = ({ form, setForm, onGuardar, onCancelar, editando, loading }) => {
  return (
    <Paper elevation={0} sx={{ p: { xs: 2, sm: 3 }, mb: 4, border: "1px solid", borderColor: "divider" }}>
      <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 800 }}>
        {editando ? "Actualizar aprendiz" : "Crear aprendiz"}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
        Completa los datos del aprendiz para guardar su registro.
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: { xs: 1.5, sm: 2 },
        }}
      >
        {campos.map((campo) => (
          <TextField
            key={campo.name}
            label={campo.label}
            type={campo.type || "text"}
            size="small"
            value={form[campo.name]}
            onChange={(e) => setForm({ ...form, [campo.name]: e.target.value })}
            slotProps={campo.type === "date" ? { inputLabel: { shrink: true } } : undefined}
          />
        ))}
      </Box>

      <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
        <Button variant="contained" onClick={onGuardar} disabled={loading}>
          {editando ? "Guardar cambios" : "Crear aprendiz"}
        </Button>
        {editando && (
          <Button variant="outlined" color="inherit" onClick={onCancelar} disabled={loading}>
            CANCELAR
          </Button>
        )}
      </Stack>
    </Paper>
  );
};

export default FormularioAprendiz;