import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "../components/theme";
import { ExtentionProvider } from "../data/universal-hooks";

function MyApp({ Component, pageProps }) {
  return (
    <ExtentionProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </ExtentionProvider>
  );
}

export default MyApp;
