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
    <Paper elevation={4} sx={{ p: 2, mb: 3, border: "1px solid #334155" }}>
      <Typography sx={{ mb: 2, fontWeight: 600 }}>
        {editando ? "Actualizar aprendiz" : "Crear aprendiz"}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: 2,
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

      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Button variant="contained" onClick={onGuardar} disabled={loading}>
          {editando ? "GUARDAR CAMBIOS" : "CREAR"}
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