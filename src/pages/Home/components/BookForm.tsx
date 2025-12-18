import { useNavigate } from "react-router-dom";
import { BookPlus } from "lucide-react";
import { Button, Card, Input } from "../../../components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { ROUTES } from "../../../routes/routes";
import { Controller, useForm } from "react-hook-form";
import { HOME_QUERY_KEY } from "../constants/queries";
import { useMutation } from "@tanstack/react-query";
import {
  newBookInitialData,
  newBookSchema,
  type NewBookFormValues,
} from "./schema";

const BookForm = () => {
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
    mutationFn: async () => {},
  });

  const onSubmit = async (values: NewBookFormValues) => {
    console.log(values);
    createBook();
  };

  return (
    <div className="flex flex-col h-screen w-full p-2">
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
            name="title"
            render={({ field }) => (
              <div>
                <label>Título</label>
                <Input
                  {...field}
                  type="text"
                  placeholder="Digite o título"
                  className="transition-all duration-300 focus:shadow-soft w-full"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
              </div>
            )}
          />

          <Controller
            control={control}
            name="author"
            render={({ field }) => (
              <div>
                <label>Autor</label>
                <Input
                  {...field}
                  type="text"
                  placeholder="Digite o nome do autor"
                  className="transition-all duration-300 focus:shadow-soft w-full"
                />
                {errors.author && (
                  <p className="text-red-500 text-sm">
                    {errors.author.message}
                  </p>
                )}
              </div>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <Controller
              control={control}
              name="genre"
              render={({ field }) => (
                <div>
                  <label>Gênero</label>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Digite o gênero"
                    className="transition-all duration-300 focus:shadow-soft w-full"
                  />
                  {errors.genre && (
                    <p className="text-red-500 text-sm">
                      {errors.genre.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              control={control}
              name="publishYear"
              render={({ field }) => (
                <div>
                  <label>Ano de publicação</label>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Digite o ano de publicação"
                    className="transition-all duration-300 focus:shadow-soft w-full"
                  />
                  {errors.publishYear && (
                    <p className="text-red-500 text-sm">
                      {errors.publishYear.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <Controller
            control={control}
            name="copiesNumber"
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
                {errors.copiesNumber && (
                  <p className="text-red-500 text-sm">
                    {errors.copiesNumber.message}
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
