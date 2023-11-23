import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "../components/theme";
import { ExtentionProvider } from "../data/universal-hooks";
import { ApolloProvider } from "@apollo/client";

import { client } from "../data/apolloClient";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <ExtentionProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </ExtentionProvider>
    </ApolloProvider>
  );
}

export default MyApp;
