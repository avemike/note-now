import { Suspense, useEffect } from "react";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { Navigate, Route, BrowserRouter, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "./Layout";
import { AuthProvider } from "./auth/AuthContext";
import { PageLoader } from "./components/PageLoader";
import { Navigation } from "./navigation";
import { NotFoundPage } from "./pages/NotFoundPage";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  useEffect(() => {
    if (!location.pathname.startsWith("/web")) {
      location.pathname = "/web";
    }
  }, []);

  return (
    <>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <BrowserRouter basename={"/web"}>
          <Routes>
            <Route
              path="*"
              element={
                <AuthProvider>
                  <Suspense fallback={<PageLoader />}>
                    <Layout>
                      <Routes>
                        <Route
                          path="/"
                          element={
                            <Navigate to={Navigation.DEFAULT_PAGE.path} />
                          }
                        />
                        {Object.values(Navigation).map((route) => (
                          <Route
                            key={route.path}
                            path={route.path}
                            element={<route.component />}
                          />
                        ))}

                        <Route path="*" element={<NotFoundPage />} />
                      </Routes>
                    </Layout>
                  </Suspense>
                </AuthProvider>
              }
            />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
};

export default App;
