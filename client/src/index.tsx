import React, { Suspense } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import ReactDOM from "react-dom";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "transparent transparent",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "transparent",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 0,
            backgroundColor: "#efefef",
            minHeight: 16,
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
            {
              backgroundColor: "#dedede",
            },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
            {
              backgroundColor: "transparent",
            },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
            {
              backgroundColor: "#dedede",
            },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "transparent",
          },
        },
      },
    },
  },
});

const LocaleAppProvider = React.memo(() => {
  const App = React.lazy(() => import("./app/App"));

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Suspense fallback={<div />}>
          <App />
        </Suspense>
      </ThemeProvider>
    </React.StrictMode>
  );
});

ReactDOM.render(<LocaleAppProvider />, document.getElementById("root"));
