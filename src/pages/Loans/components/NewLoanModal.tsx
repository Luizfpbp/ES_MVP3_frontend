import { Controller, useForm } from "react-hook-form";
import { Button, Select } from "../../../components/ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/Dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  newLoanInitialData,
  newLoanSchema,
  type NewLoanFormValues,
} from "./schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { HOME_QUERY_KEY } from "../../Home/constants/queries";
import { USERS_QUERY_KEY } from "../../Users/constants/queries";
import type { BookListDTO } from "../../Home/types";
import type { UserListDTO } from "../../Users/types";
import { LOAN_QUERY_KEY } from "../constants/queries";
import { toast } from "react-toastify";

interface NewLoanModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DB_URL = import.meta.env.VITE_API_URL;

const NewLoanModal = ({ open, setOpen }: NewLoanModalProps) => {
  const queryClient = useQueryClient();
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newLoanSchema),
    defaultValues: newLoanInitialData,
  });

  const { mutateAsync: loanBook, isPending: isLoaningBook } = useMutation({
    mutationKey: [LOAN_QUERY_KEY.CREATE_LOAN],
    mutationFn: async (form: FormData) => {
      const response = await fetch(`${DB_URL}/emprestimo`, {
        method: "post",
        body: form,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message);
      }

      return data;
    },
    onSuccess() {
      toast.success("Livro emprestado com sucesso");
      queryClient.invalidateQueries({ queryKey: [LOAN_QUERY_KEY.LIST_LOANS] });
      queryClient.invalidateQueries({ queryKey: [HOME_QUERY_KEY.BOOKS_LIST] });
      queryClient.invalidateQueries({
        queryKey: [HOME_QUERY_KEY.BOOKS_LIST_OPTIONS],
      });
      handleClose(false);
    },
    onError() {
      toast.error("Erro ao emprestar o livro");
    },
  });

  const { data: booksList, isLoading: isBooksLoading } = useQuery<BookListDTO>({
    queryKey: [HOME_QUERY_KEY.BOOKS_LIST_OPTIONS],
    queryFn: async () => {
      const url = `${DB_URL}/livros`;

      const response = await fetch(url);
      return await response.json();
    },
  });

  const { data: usersList, isLoading: isUsersLoading } = useQuery<UserListDTO>({
    queryKey: [USERS_QUERY_KEY.USERS_LIST_OPTIONS],
    queryFn: async () => {
      const url = `${DB_URL}/usuarios`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message);
      }

      return data;
    },
  });

  const booksOptions = booksList?.values
    .filter((book) => book.disponivel > 0)
    .map((book) => ({
      ...book,
      value: book.id.toString(),
      label: book.titulo,
    }));

  const userOptions = usersList?.values.map((user) => ({
    ...user,
    value: user.id.toString(),
    label: user.nome,
  }));

  const handleClose = (open: boolean) => {
    reset(newLoanInitialData);
    setOpen(open);
  };

  const onSubmit = (values: NewLoanFormValues) => {
    const form = new FormData();
    form.append("usuario_id", values.usuario);
    form.append("livro_id", values.livro);
    loanBook(form);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Registrar Empréstimo</DialogTitle>
          <DialogDescription>
            Preencha os dados do novo empréstimo
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 py-4 w-full"
        >
          <Controller
            control={control}
            name="livro"
            render={({ field }) => (
              <>
                <label>Livro</label>
                <Select
                  onChange={field.onChange}
                  placeholder={
                    isBooksLoading ? "Carregando..." : "Selecione um Livro"
                  }
                  options={booksOptions ?? []}
                />
                {errors.livro && (
                  <p className="text-red-500 text-sm">{errors.livro.message}</p>
                )}
              </>
            )}
          />
          <Controller
            control={control}
            name="usuario"
            render={({ field }) => (
              <>
                <label>Usuário</label>
                <Select
                  onChange={field.onChange}
                  placeholder={
                    isUsersLoading ? "Carregando..." : "Selecione um usuário"
                  }
                  options={userOptions ?? []}
                />
                {errors.usuario && (
                  <p className="text-red-500 text-sm">
                    {errors.usuario.message}
                  </p>
                )}
              </>
            )}
          />
          <Button type="submit" disabled={isLoaningBook} className="w-full">
            Confirmar Empréstimo
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewLoanModal;
