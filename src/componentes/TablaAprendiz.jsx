import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const columnas = [
  { key: "id", label: "ID" },
  { key: "nombre", label: "Nombre" },
  { key: "apellido", label: "Apellido" },
  { key: "numero_documento", label: "Documento" },
  { key: "email", label: "Email" },
  { key: "telefono", label: "Teléfono" },
  { key: "direccion", label: "Dirección" },
  { key: "fecha_nacimiento", label: "Fecha de nacimiento" },
  { key: "genero", label: "Género" },
  { key: "programa", label: "Programa" },
  { key: "ficha", label: "Ficha" },
];

const TablaAprendiz = ({ data, onEditar, onEliminar, loading }) => {
  return (
    <TableContainer component={Paper} elevation={3} sx={{ border: "1px solid #334155" }}>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ background: "#22d3ee" }}>
            {columnas.map((col) => (
              <TableCell key={col.key} sx={{ color: "#0b1220", fontWeight: 700 }}>
                {col.label}
              </TableCell>
            ))}
            <TableCell sx={{ color: "#0b1220", fontWeight: 700 }}>Acciones</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((fila) => (
            <TableRow key={fila.id} hover>
              {columnas.map((col) => (
                <TableCell key={col.key}>{fila[col.key]}</TableCell>
              ))}
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button size="small" variant="outlined" onClick={() => onEditar(fila)} disabled={loading}>
                    Editar
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => onEliminar(fila.id)}
                    disabled={loading}
                  >
                    Eliminar
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}

          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={columnas.length + 1} align="center">
                Sin registros
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablaAprendiz;