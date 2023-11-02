import { createTheme } from "@mui/material";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto",
  },
  palette: {
    mode: "light",
    text: { primary: "#141A38", secondary: "#606787" },
    primary: {
      main: "#8A9FF8",
      light: "#DBE2FF",
      dark: "#485BA8",
    },
    accentOne: {
      main: "#96EBA4",
      light: "#E3FFE8",
      dark: "#60B56E",
    },
    secondary: {
      main: "#E9335E",
      light: "#FF8FA9",
      dark: "#A31D3D",
    },
    accentTwo: {
      main: "#FAE982",
      light: "#FFF6BD",
      dark: "#C9B74B",
    },
    background: {
      default: "#F7F8FC",
      paper: "#FFFFFF",
      secondary: "#443569",
      input: "#E9EBF5",
    },
    error: {
      main: "#F2305E",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          boxShadow: "rgb(20 21 33 / 10%) 2px 2px 15px 0px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8 },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: { borderRadius: "8px !important" },
      },
    },
  },
});

export default theme;
