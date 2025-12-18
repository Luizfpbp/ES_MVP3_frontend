import type { ComponentType } from "react";

export interface Route {
  path: string;
  element: ComponentType;
}
