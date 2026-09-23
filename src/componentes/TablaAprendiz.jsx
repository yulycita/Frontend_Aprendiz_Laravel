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
    <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid", borderColor: "divider" }}>
      <Table size="small">
        <TableHead sx={{ backgroundColor: "#eef3ff" }}>
          <TableRow>
            {columnas.map((col) => (
              <TableCell key={col.key} sx={{ color: "primary.dark", fontWeight: 800, py: 1.5 }}>
                {col.label}
              </TableCell>
            ))}
            <TableCell sx={{ color: "primary.dark", fontWeight: 800, py: 1.5 }}>Acciones</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((fila) => (
            <TableRow key={fila.id} hover>
              {columnas.map((col) => (
                <TableCell key={col.key} sx={{ py: 1.5, color: "text.secondary" }}>
                  {fila[col.key]}
                </TableCell>
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