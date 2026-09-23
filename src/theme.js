import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#d624c1", dark: "#872991", contrastText: "#ffffff" },
    secondary: { main: "#e8753d", dark: "#c55625", contrastText: "#ffffff" },
    background: { default: "#f4f7fb", paper: "#ffffff" },
    text: { primary: "#172033", secondary: "#64748b" },
    divider: "#e2e8f0",
  },
  typography: {
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h5: { fontWeight: 800, letterSpacing: "-0.025em" },
    body2: { lineHeight: 1.6 },
    button: { fontWeight: 700, textTransform: "none" },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          boxShadow: "0 8px 24px rgba(23, 32, 51, 0.06)",
        },
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
