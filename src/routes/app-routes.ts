import Home from "../pages/Home";
import BookForm from "../pages/Home/components/BookForm";
import Loans from "../pages/Loans";
import Users from "../pages/Users";
import UserForm from "../pages/Users/components/UserForm";
import { ROUTES } from "./routes";
import type { Route } from "./types";

export const appRouteList: Route[] = [
  {
    path: ROUTES.HOME,
    element: Home,
  },
  {
    path: ROUTES.LOANS,
    element: Loans,
  },
  {
    path: ROUTES.USERS,
    element: Users,
  },
  {
    path: ROUTES.NEW_USERS,
    element: UserForm,
  },
  {
    path: ROUTES.NEW_BOOKS,
    element: BookForm,
  },
];
