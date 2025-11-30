import { useSessionStore } from "../store/useSessionStore";
import { UserType } from "../store/types";
import { Button } from "../components/ui";

const Auth = () => {
  const { setSession } = useSessionStore();

  const handleManagerLogin = () => {
    setSession({ user: UserType.ADMIN });
  };

  const handleClientLogin = () => {
    setSession({ user: UserType.CLIENT });
  };

  return (
    <div className="flex justify-center h-screen w-full">
      <div className="flex flex-col items-center gap-2 my-10">
        <p className="text-5xl font-bold">Biblioteca digital</p>
        <p className="text-2xl text-black/50">Selecione o tipo de acesso</p>
        <div className="border flex flex-col justify-center items-center rounded-xl border-transparent bg-white shadow gap-2 p-4 my-10">
          <p className="text-2xl font-semibold">Acesso ao sistema</p>
          <p className="text-xl text-black/50">
            Escolha como entrar na plataforma
          </p>
          <Button className="w-full" onClick={handleManagerLogin}>
            Acessar como administrador
          </Button>
          <Button className="w-full" onClick={handleClientLogin}>
            Acessar como cliente
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
