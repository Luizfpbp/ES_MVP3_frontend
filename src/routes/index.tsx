import { Route, Routes } from "react-router-dom";
import { authRouteList } from "./auth-routes";
import { appRouteList } from "./app-routes";
import Page404 from "../pages/Page404";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

const RoutesProvider = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        {authRouteList.map((route, index) => (
          <Route key={index} path={route.path} element={<route.element />} />
        ))}
      </Route>
      <Route element={<MainLayout />}>
        {appRouteList.map((route, index) => (
          <Route key={index} path={route.path} element={<route.element />} />
        ))}
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default RoutesProvider;
