import { LoginPage } from "./pages/LoginPage";

const Routes = {
  LOGIN: {
    path: "/login",
    component: LoginPage,
  },
} as const;

export const AnonymousRoutes = [Routes.LOGIN.path];

export const Navigation = {
  ...Routes,
  DEFAULT_PAGE: Routes.LOGIN,
};
