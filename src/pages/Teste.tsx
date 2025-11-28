import { LogOutIcon } from "lucide-react";
import { Button } from "../components/ui";
import { useSessionStore } from "../store/useSessionStore";

const Teste = () => {
  const { clearSession } = useSessionStore();

  return (
    <div className="flex justify-center h-screen w-full">
      <div className="flex w-full justify-between">
        <p className="text-3xl font-bold">Teste</p>
        <Button onClick={clearSession}>
          <div className="flex gap-2">
            <LogOutIcon />
            Logout
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Teste;
