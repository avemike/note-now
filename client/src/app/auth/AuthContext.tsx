import React, { useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useQueryClient } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../api";
import { login as loginQuery } from "../../api/queries";
import { PageLoader } from "../components/PageLoader";
import { AnonymousRoutes, Navigation } from "../navigation";

const tokenKey = "accessToken";

function setAuthorizationHeader(token: string) {
  if (token) {
    API.config.globalHeaders["Authorization"] = "Token " + token;
  } else if ("Authorization" in API.config.globalHeaders) {
    delete API.config.globalHeaders["Authorization"];
  }
}

export const AuthContext = React.createContext<{
  logout: () => void;
  login: (email: string, password: string) => void;
}>({
  logout: () => {
    /* empty */
  },
  login: () => {
    /* empty */
  },
});

export const AuthProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();

  const [accessToken, setAccessToken] = useState(
    sessionStorage.getItem(tokenKey) ?? ""
  );
  const [ready, setReady] = useState(false);

  const updateAccessToken = useCallback<(token: string) => void>((token) => {
    setAccessToken(token);
    if (token) {
      sessionStorage.setItem(tokenKey, token);
    } else {
      sessionStorage.removeItem(tokenKey);
    }
    setAuthorizationHeader(token);
  }, []);

  const logout = useCallback(() => {
    updateAccessToken("");
    queryClient.clear();
  }, [updateAccessToken, queryClient]);

  useEffect(() => {
    API.fetch = async (input: RequestInfo, init?: RequestInit) => {
      const res = await window.fetch(input, init);
      if (res.status === 401) {
        logout();
      }
      return res;
    };
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logout]);

  useEffect(() => {
    setAuthorizationHeader(accessToken);
  }, [accessToken]);

  const login = async (email: string, password: string) => {
    try {
      const response = await loginQuery(email, password);
      if (response?.token) {
        setAuthorizationHeader(response.token);

        updateAccessToken(response.token);
        toast.success("Successful login");
      } else {
        updateAccessToken("");
      }
    } catch (e) {
      updateAccessToken("");
      throw e;
    }
  };

  useEffect(() => {
    if (accessToken) {
      if (AnonymousRoutes.includes(location.pathname as never)) {
        navigate(Navigation.DEFAULT_PAGE.path);
      }
    } else if (!AnonymousRoutes.includes(location.pathname as never)) {
      navigate(Navigation.WELCOME_PAGE.path);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, location.pathname]);

  return (
    <AuthContext.Provider value={{ logout, login }}>
      {ready ? (
        children
      ) : (
        <Box height="100vh">
          <PageLoader />
        </Box>
      )}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}
