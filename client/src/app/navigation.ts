import { HomePage } from "./pages/HomePage";
import { WelcomePage } from "./pages/welcomePage/WelcomePage";

const Routes = {
  WELCOME_PAGE: {
    path: "/welcome_page",
    component: WelcomePage,
  },
  HOME: {
    path: "/home",
    component: HomePage,
  },
} as const;

export const AnonymousRoutes = [Routes.WELCOME_PAGE.path];

export const Navigation = {
  ...Routes,
  DEFAULT_PAGE: Routes.HOME,
};
