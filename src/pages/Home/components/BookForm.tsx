import { useNavigate } from "react-router-dom";
import { BookPlus } from "lucide-react";
import { Button, Card, Input, Select } from "../../../components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { ROUTES } from "../../../routes/routes";
import { Controller, useForm } from "react-hook-form";
import { HOME_QUERY_KEY } from "../constants/queries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  newBookInitialData,
  newBookSchema,
  type NewBookFormValues,
} from "./schema";
import { toast } from "react-toastify";
import { BOOK_GENRE_OPTIONS } from "../constants";
import { convertInputDate } from "../../../components/utils";

const DB_URL = import.meta.env.VITE_API_URL;

const BookForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newBookSchema),
    defaultValues: newBookInitialData,
  });

  const { mutateAsync: createBook, isPending: isCreatingBook } = useMutation({
    mutationKey: [HOME_QUERY_KEY.BOOKS_ADD],
    mutationFn: async (values: FormData) => {
      const response = await fetch(`${DB_URL}/livro`, {
        method: "post",
        body: values,
      });
      if (!response.ok) {
        throw new Error("Erro ao criar livro");
      }

      return response.json();
    },
    onSuccess() {
      toast.success("Sucesso ao criar um livro");
      queryClient.invalidateQueries({ queryKey: [HOME_QUERY_KEY.BOOKS_LIST] });
      queryClient.invalidateQueries({
        queryKey: [HOME_QUERY_KEY.BOOKS_LIST_OPTIONS],
      });
      navigate(ROUTES.HOME);
    },
    onError() {
      toast.error("Erro ao criar um livro");
    },
  });

  const onSubmit = async (values: NewBookFormValues) => {
    const form = new FormData();
    form.append("autor", values.autor);
    form.append("genero", values.genero);
    form.append("lancamento", convertInputDate(values.lancamento));
    form.append("titulo", values.titulo);
    form.append("disponivel", values.disponivel.toString());

    createBook(form);
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <div className="flex flex-col flex-none">
        <h1 className="text-4xl font-display font-bold mb-2">
          Cadastrar Livro
        </h1>
        <p className="text-black/50">
          Preencha os dados para cadastrar um novo livro
        </p>
      </div>

      <Card className="flex-1 flex-col justify-start items-stretch overflow-hidden">
        <div className="flex items-center gap-3 flex-none mb-4">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-soft">
            <BookPlus className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="font-display">Informações do Livro</p>
            <p className="text-black/50">Preencha todos os dados do livro</p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto space-y-6 pr-2"
        >
          <Controller
            control={control}
            name="titulo"
            render={({ field }) => (
              <div>
                <label>Título</label>
                <Input
                  {...field}
                  type="text"
                  placeholder="Digite o título"
                  className="transition-all duration-300 focus:shadow-soft w-full"
                />
                {errors.titulo && (
                  <p className="text-red-500 text-sm">
                    {errors.titulo.message}
                  </p>
                )}
              </div>
            )}
          />

          <Controller
            control={control}
            name="autor"
            render={({ field }) => (
              <div>
                <label>Autor</label>
                <Input
                  {...field}
                  type="text"
                  placeholder="Digite o nome do autor"
                  className="transition-all duration-300 focus:shadow-soft w-full"
                />
                {errors.autor && (
                  <p className="text-red-500 text-sm">{errors.autor.message}</p>
                )}
              </div>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <Controller
              control={control}
              name="genero"
              render={({ field }) => (
                <div>
                  <label>Gênero</label>
                  <Select
                    onChange={field.onChange}
                    placeholder="Selecione um gênero"
                    options={BOOK_GENRE_OPTIONS}
                  />
                  {errors.genero && (
                    <p className="text-red-500 text-sm">
                      {errors.genero.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              control={control}
              name="lancamento"
              render={({ field }) => (
                <div>
                  <label>Ano de publicação</label>
                  <Input
                    {...field}
                    type="date"
                    placeholder="Selecione a data de publicação"
                    className="transition-all duration-300 focus:shadow-soft w-full"
                  />
                  {errors.lancamento && (
                    <p className="text-red-500 text-sm">
                      {errors.lancamento.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <Controller
            control={control}
            name="disponivel"
            render={({ field }) => (
              <div>
                <label>Número de cópias</label>
                <Input
                  {...field}
                  type="number"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  placeholder="Digite o número de cópias"
                  className="transition-all duration-300 focus:shadow-soft w-full"
                />
                {errors.disponivel && (
                  <p className="text-red-500 text-sm">
                    {errors.disponivel.message}
                  </p>
                )}
              </div>
            )}
          />

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={() => navigate(ROUTES.HOME)}
              className="flex-1 hover:bg-secondary"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isCreatingBook}
              className="flex-1 bg-primary hover:opacity-90 transition-all duration-300 shadow-soft hover:shadow-elegant"
            >
              {isCreatingBook ? "Cadastrando..." : "Cadastrar"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default BookForm;
