import { z } from "zod";

export const newBookInitialData: NewBookFormValues = {
  title: "",
  author: "",
  genre: "",
  publishYear: "",
  copiesNumber: 1,
};

export const newBookSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  author: z.string().min(1, "Preencha o nome do autor"),
  genre: z.string().min(1, "Preencha o genero do lívro"),
  publishYear: z.string().min(1, "Preencha o ano de publicação"),
  copiesNumber: z.number(),
});

export type NewBookFormValues = z.infer<typeof newBookSchema>;
