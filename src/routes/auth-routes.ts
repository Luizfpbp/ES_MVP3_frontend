import Auth from "../pages/Auth";
import { ROUTES } from "./routes";
import type { Route } from "./types";

export const authRouteList: Route[] = [
  {
    path: ROUTES.LOGIN,
    element: Auth,
  },
];
