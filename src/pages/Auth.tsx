import { useSessionStore } from "../store/useSessionStore";
import { UserType } from "../store/types";
import { Button } from "../components/ui";

const Auth = () => {
  const { setSession } = useSessionStore();

  const handleLogin = () => {
    setSession({ user: UserType.ADMIN });
  };

  return (
    <div className="flex justify-center h-screen w-full">
      <div className="flex flex-col items-center gap-2 my-10">
        <p className="text-5xl font-bold">Biblioteca digital</p>
        <div className="border flex flex-col justify-center items-center rounded-xl border-transparent bg-white shadow gap-2 p-4 my-10">
          <p className="text-2xl font-semibold">Acesso ao sistema</p>
          <Button className="w-full" onClick={handleLogin}>
            Acessar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
