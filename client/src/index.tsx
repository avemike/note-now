import React, { Suspense } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import ReactDOM from "react-dom";

const theme = createTheme({});

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