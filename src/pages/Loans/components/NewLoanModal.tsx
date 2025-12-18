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
import { useQuery } from "@tanstack/react-query";
import { HOME_QUERY_KEY } from "../../Home/constants/queries";
import { booksOptions } from "../../Home/constants/mockbooks";
import { usersOptions } from "../../Users/constants/mockusers";
import { USERS_QUERY_KEY } from "../../Users/constants/queries";

interface NewLoanModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const NewLoanModal = ({ open, setOpen }: NewLoanModalProps) => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newLoanSchema),
    defaultValues: newLoanInitialData,
  });

  const { data: booksList = [], isLoading: isBooksLoading } = useQuery({
    queryKey: [HOME_QUERY_KEY.BOOKS_LIST_OPTIONS],
    queryFn: () => booksOptions,
  });

  const { data: usersList = [], isLoading: isUsersLoading } = useQuery({
    queryKey: [USERS_QUERY_KEY.USERS_LIST_OPTIONS],
    queryFn: () => usersOptions,
  });

  const handleClose = (open: boolean) => {
    reset(newLoanInitialData);
    setOpen(open);
  };

  const onSubmit = (values: NewLoanFormValues) => {
    console.log("form", values);
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
            name="book"
            render={({ field }) => (
              <>
                <label>Livro</label>
                <Select
                  onChange={field.onChange}
                  placeholder={
                    isBooksLoading ? "Carregando..." : "Selecione um Livro"
                  }
                  options={booksList}
                />
                {errors.book && (
                  <p className="text-red-500 text-sm">{errors.book.message}</p>
                )}
              </>
            )}
          />
          <Controller
            control={control}
            name="user"
            render={({ field }) => (
              <>
                <label>Usuário</label>
                <Select
                  onChange={field.onChange}
                  placeholder={
                    isUsersLoading ? "Carregando..." : "Selecione um usuário"
                  }
                  options={usersList}
                />
                {errors.user && (
                  <p className="text-red-500 text-sm">{errors.user.message}</p>
                )}
              </>
            )}
          />
          <Button type="submit" className="w-full">
            Confirmar Empréstimo
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewLoanModal;
