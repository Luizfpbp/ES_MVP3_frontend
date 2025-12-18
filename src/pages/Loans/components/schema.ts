import z from "zod";

export const newLoanInitialData: NewLoanFormValues = {
  book: "",
  user: "",
};

export const newLoanSchema = z.object({
  book: z.string().min(1, "Selecione um livro"),
  user: z.string().min(1, "Selecione um usuário"),
});

export type NewLoanFormValues = z.infer<typeof newLoanSchema>;
