import { Navigate, Outlet } from "react-router-dom";
import { useSessionStore } from "../store/useSessionStore";

const MainLayout = () => {
  const { session } = useSessionStore();

  if (!session) return <Navigate to="/login" />;

  return (
    <div className="flex h-screen">
      <Outlet />
    </div>
  );
};

export default MainLayout;
