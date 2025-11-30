import { Navigate, Outlet } from "react-router-dom";
import { useSessionStore } from "../store/useSessionStore";
import { ROUTES } from "../routes/routes";

const AuthLayout = () => {
  const { session } = useSessionStore();

  if (session) return <Navigate to={ROUTES.HOME} />;

  return (
    <div className="flex h-screen">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
