import { Navigate, Outlet } from "react-router-dom";
import { useSessionStore } from "../store/useSessionStore";
import { SideBar } from "../components/ui";
import { ROUTES } from "../routes/routes";

const MainLayout = () => {
  const { session } = useSessionStore();

  if (!session) return <Navigate to={ROUTES.LOGIN} />;

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
