import { Box } from "@mui/material";
import { useLocation } from "react-router";
import { Navigation } from "./navigation";

export function Layout({
  children,
}: {
  children: React.PropsWithChildren<unknown>;
}) {
  const location = useLocation();

  switch (location.pathname) {
    case Navigation.WELCOME_PAGE.path:
      return <Box>{children}</Box>;
  }

  return <Box>{children}</Box>;
}

export default Layout;
