import Auth from "../pages/Auth";
import { ROUTES } from "./routes";
import type { IRoute } from "./types";

export const authRouteList: IRoute[] = [
  {
    path: ROUTES.LOGIN,
    element: Auth,
  },
];
