import { useEffect, useState } from "react";
import { Badge, Button, Card } from "../../components/ui";
import { CheckCircle, Clock, PlusIcon } from "lucide-react";
import NewLoanModal from "./components/NewLoanModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LOAN_QUERY_KEY } from "./constants/queries";
import { toast } from "react-toastify";
import type { LoanListDTO } from "./types";

const DB_URL = import.meta.env.VITE_API_URL;

const Loans = () => {
  const queryClient = useQueryClient();
  const [openNewLoan, setOpenNewLoan] = useState(false);

  const { data: loansList, isError } = useQuery<LoanListDTO>({
    queryKey: [LOAN_QUERY_KEY.LIST_LOANS],
    queryFn: async () => {
      const response = await fetch(`${DB_URL}/emprestimos`);
      return await response.json();
    },
  });

  const { mutateAsync: returnBook, isPending: isReturningBook } = useMutation({
    mutationKey: [LOAN_QUERY_KEY.RETURN_LOAN],
    mutationFn: async (form: FormData) => {
      const response = await fetch(`${DB_URL}/emprestimo/devolver`, {
        method: "put",
        body: form,
      });

      return await response.json();
    },
    onSuccess() {
      toast.success("Livro retornado com sucesso");
      queryClient.invalidateQueries({ queryKey: [LOAN_QUERY_KEY.LIST_LOANS] });
    },
    onError() {
      toast.error("Erro ao retornar o livro");
    },
  });

  useEffect(() => {
    if (isError) toast.error("Erro ao buscar os empréstimos");
  }, [isError]);

  const activeLoans =
    loansList?.values.filter((loan) => loan.devolvido === false) ?? [];
  const completedLoans =
    loansList?.values.filter((loan) => loan.devolvido === true) ?? [];

  const handleReturn = (loanId: number) => {
    const form = new FormData();
    form.append("emprestimo_id", loanId.toString());
    returnBook(form);
  };

  return (
    <div className="flex flex-col h-screen w-full p-2">
      <div className="flex w-full justify-between flex-none">
        <div className="flex flex-col items-start">
          <h1 className="font-display font-bold mb-2">Empréstimos</h1>
          <p className="text-black/50">Gerencie empréstimos e devoluções</p>
        </div>
        <Button
          className="flex justify-center gap-1"
          onClick={() => setOpenNewLoan(true)}
        >
          <PlusIcon />
          Novo Empréstimo
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 h-full">
        <Card className="shadow-soft border-border/50">
          <div className="flex w-full items-center justify-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-accent flex items-center justify-center">
              <Clock className="w-10 h-10 bg-primary border-8 border-transparent rounded-xl" />
            </div>
            <div>
              <p>Empréstimos Ativos</p>
              <p className="text-black/50">{activeLoans.length} em andamento</p>
            </div>
          </div>
          <div className="space-y-3 w-full h-full">
            {activeLoans.map((loan) => (
              <Card key={loan.id} className="border-border/50">
                <div className="space-y-2 w-full">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold">{loan.livro.titulo}</p>
                      <p className="text-sm text-black/50">
                        {loan.livro.autor}
                      </p>
                    </div>
                    <Badge variant="default">
                      <Clock className="w-3 h-3 mr-1" />
                      Ativo
                    </Badge>
                  </div>
                  <div className="text-sm space-y-1 pt-2 border-t border-border/30">
                    <div className="flex justify-between">
                      <span className="text-black/50">Usuário:</span>
                      <span className="font-medium">{loan.usuario.nome}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black/50">Empréstimo:</span>
                      <span className="font-medium">
                        {new Date(loan.data_emprestimo).toLocaleDateString(
                          "pt-BR"
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black/50">Devolução:</span>
                      <span className="font-medium">
                        {loan.data_devolucao
                          ? new Date(loan.data_devolucao).toLocaleDateString(
                              "pt-BR"
                            )
                          : "-"}
                      </span>
                    </div>
                  </div>
                  {!loan.devolvido && (
                    <Button
                      className="w-full"
                      disabled={isReturningBook}
                      onClick={() => handleReturn(loan.id)}
                    >
                      <div className="flex items-center justify-center gap-4">
                        <CheckCircle className="w-4 h-4" />
                        Registrar Devolução
                      </div>
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </Card>

        <Card className="shadow-soft border-border/50 justify-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-accent flex items-center justify-center">
              <CheckCircle className="w-10 h-10 bg-primary border-8 border-transparent rounded-xl" />
            </div>
            <div className="items-center justify-center">
              <p className="font-display font-bold mb-2">
                Histórico de Devoluções
              </p>
              <p className="text-black/50">
                {completedLoans.length} devolvidos
              </p>
            </div>
          </div>
          <div className="rounded-md border border-border/50 w-full">
            <table className="relative w-full overflow-auto">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors data-[state=selected]:bg-muted hover:bg-muted/50 bg-muted/50">
                  <th className="font-semibold text-start py-1 px-4">Livro</th>
                  <th className="font-semibold text-start py-1 px-4">Usuário</th>
                  <th className="font-semibold text-start py-1 px-4">Devolução</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {completedLoans.map((loan) => (
                  <tr
                    key={loan.id}
                    className="hover:bg-black/30 transition-colors"
                  >
                    <td className="p-4 [&:has([role=checkbox])]:pr-0">
                      <div>
                        <p className="font-medium">{loan.livro.titulo}</p>
                        <p className="text-xs text-black/50">
                          {loan.livro.autor}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 [&:has([role=checkbox])]:pr-0 text-black/50">
                      {loan.usuario.nome}
                    </td>
                    <td className="p-4 [&:has([role=checkbox])]:pr-0 text-black/50">
                      {loan.data_devolucao &&
                        new Date(loan.data_devolucao).toLocaleDateString(
                          "pt-BR"
                        )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
      <NewLoanModal open={openNewLoan} setOpen={setOpenNewLoan} />
    </div>
  );
};

export default Loans;
