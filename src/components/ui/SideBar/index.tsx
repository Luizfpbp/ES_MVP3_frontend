import { BookOpen, LogOutIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/routes";
import SideBarItem from "./SideBarItem";
import Button from "../Button";
import { useSessionStore } from "../../../store/useSessionStore";

const SideBar = () => {
  const navigate = useNavigate();
  const { clearSession } = useSessionStore();

  const handleHomeClick = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <div className="flex flex-col items-center px-1 py-2">
      <Button className="w-full" onClick={clearSession}>
        <div className="flex items-center justify-center gap-2">
          <LogOutIcon />
          Logout
        </div>
      </Button>
      <div className="flex flex-1 flex-col items-center border rounded-xl border-transparent bg-amber-800 w-full p-4 m-2">
        <div className="flex flex-1 flex-col items-center gap-2">
          <BookOpen
            onClick={handleHomeClick}
            className="w-18 h-18 cursor-pointer"
            color="white"
          />
          <SideBarItem label="Catálogo" route={ROUTES.HOME} />
          <SideBarItem label="Empréstimos" route={ROUTES.LOANS} />
          <SideBarItem label="Usuários" route={ROUTES.USERS} />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
