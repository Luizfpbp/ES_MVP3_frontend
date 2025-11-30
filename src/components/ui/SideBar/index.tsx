import { BookOpen, LogOutIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/routes";
import SideBarItem from "./SideBarItem";
import Button from "../Button";
import { useSessionStore } from "../../../store/useSessionStore";

const SideBar = () => {
  const navigate = useNavigate();
  const { clearSession, returnUserType } = useSessionStore();

  const handleHomeClick = () => {
    navigate(ROUTES.HOME);
  };

  const handleTesteClick = () => {
    navigate(ROUTES.TESTE);
  };

  return (
    <div className="flex flex-col px-1 py-2">
      <Button onClick={clearSession}>
        <div className="flex gap-2">
          <LogOutIcon />
          Logout
        </div>
      </Button>
      <div className="flex flex-1 flex-col items-center border rounded-xl border-transparent bg-amber-800 p-4 m-2">
        <div className="flex flex-1 flex-col gap-2">
          <BookOpen
            onClick={handleHomeClick}
            className="w-18 h-18 cursor-pointer"
            color="white"
          />
          <SideBarItem label="Teste" onItemClick={handleTesteClick} />
        </div>
        <p className="text-lg text-white">{returnUserType()}</p>
      </div>
    </div>
  );
};

export default SideBar;
