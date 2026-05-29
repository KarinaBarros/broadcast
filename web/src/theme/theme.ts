import { createTheme } from "@mui/material/styles";

export const getTheme = () => {
  return createTheme({
    palette: {
      mode: "dark",

      primary: {
        main: "#7c4dff",
      },
      text: {
        primary: "#ffffff",
        secondary: "rgba(255, 255, 255, 0.7)",
        disabled: "rgba(255, 255, 255, 0.5)",
      },

      background: {
        default: "#09090b",
        paper: "#18181b",
      },
    },

    shape: {
      borderRadius: 12,
    },

    typography: {
      fontFamily: "Inter, sans-serif",
      allVariants: {
        color: "#ffffff",
      },
    },
  });
};
