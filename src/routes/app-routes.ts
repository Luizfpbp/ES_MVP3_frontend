import Home from "../pages/Home";
import Teste from "../pages/Teste";
import type { IRoute } from "./types";

export const appRouteList: IRoute[] = [
  {
    path: "/",
    element: Home,
  },
  {
    path: "/test",
    element: Teste,
  },
];
