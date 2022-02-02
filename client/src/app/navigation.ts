import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";

const Routes = {
  LOGIN: {
    path: "/login",
    component: LoginPage,
  },
  HOME: {
    path: "/home",
    component: HomePage,
  },
} as const;

export const AnonymousRoutes = [Routes.LOGIN.path];

export const Navigation = {
  ...Routes,
  DEFAULT_PAGE: Routes.HOME,
};
