import Auth from "../pages/Auth";
import type { IRoute } from "./types";

export const authRouteList: IRoute[] = [
  {
    path: "/login",
    element: Auth,
  },
];
