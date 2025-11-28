import { Navigate, Outlet } from "react-router-dom";
import { useSessionStore } from "../store/useSessionStore";

const AuthLayout = () => {
  const { session } = useSessionStore();

  if (session) return <Navigate to="/" />;

  return (
    <div className="flex h-screen">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
