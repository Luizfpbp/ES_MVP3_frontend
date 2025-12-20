import { z } from "zod";

export const newBookInitialData: NewBookFormValues = {
  titulo: "",
  autor: "",
  genero: "",
  lancamento: "",
  disponivel: 1,
};

export const newBookSchema = z.object({
  titulo: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  autor: z.string().min(1, "Preencha o nome do autor"),
  genero: z.string().min(1, "Preencha o genero do lívro"),
  lancamento: z.string().min(1, "Preencha o ano de publicação"),
  disponivel: z.number(),
});

export type NewBookFormValues = z.infer<typeof newBookSchema>;
