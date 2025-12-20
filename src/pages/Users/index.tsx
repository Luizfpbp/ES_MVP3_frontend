import { UserPlus } from "lucide-react";
import { Button, Card } from "../../components/ui";
import { useQuery } from "@tanstack/react-query";
import { USERS_QUERY_KEY } from "./constants/queries";
import { ROUTES } from "../../routes/routes";
import { useNavigate } from "react-router-dom";
import type { UserListDTO } from "./types";
import { toast } from "react-toastify";
import { useEffect } from "react";

const DB_URL = import.meta.env.VITE_API_URL;

const Users = () => {
  const navigate = useNavigate();
  const { data: usersList, isError } = useQuery<UserListDTO>({
    queryKey: [USERS_QUERY_KEY.USERS_LIST],
    queryFn: async () => {
      const url = `${DB_URL}/usuarios`;

      const response = await fetch(url);
      return await response.json();
    },
  });

  useEffect(() => {
    if (isError) toast.error("Erro ao buscar os usuários");
  }, [isError]);

  return (
    <div className="flex flex-col h-screen w-full p-2">
      <div className="flex w-full justify-between flex-none">
        <div className="flex flex-col items-start">
          <h1 className="font-display font-bold mb-2">
            Gerenciamento de Usuários
          </h1>
          <p className="text-black/50">Administre clientes e administradores</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => navigate(ROUTES.NEW_USERS)}
            className="bg-primary shadow-soft hover:shadow-elegant transition-all duration-300"
          >
            <div className="flex items-center gap-1">
              <UserPlus className="w-4 h-4 mr-2" />
              Novo Usuário
            </div>
          </Button>
        </div>
      </div>

      <Card className="shadow-soft border-border/50">
        <p className="font-display">Lista de Usuários</p>
        <p className="text-black/50">
          Total de {usersList?.values.length ?? 0} usuários cadastrados
        </p>

        <div className="rounded-md border border-border/50 w-full">
          <table className="relative w-full overflow-auto">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors data-[state=selected]:bg-muted hover:bg-muted/50 bg-muted/50">
                <th className="font-semibold text-start py-1 px-4">Nome</th>
                <th className="font-semibold text-start py-1 px-4">E-mail</th>
                <th className="font-semibold text-start py-1 px-4">
                  Data Nasc.
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {usersList?.values.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-black/30 transition-colors"
                >
                  <td className="p-4 [&:has([role=checkbox])]:pr-0">
                    {user.nome}
                  </td>
                  <td className="p-4 [&:has([role=checkbox])]:pr-0">
                    {user.email}
                  </td>
                  <td className="p-4 [&:has([role=checkbox])]:pr-0">
                    {new Date(user.data_nascimento).toLocaleDateString("pt-BR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {usersList?.values.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">Nenhum usuário encontrado.</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Users;
