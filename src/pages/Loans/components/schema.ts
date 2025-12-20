import z from "zod";

export const newLoanInitialData: NewLoanFormValues = {
  livro: "",
  usuario: "",
};

export const newLoanSchema = z.object({
  livro: z.string().min(1, "Selecione um livro"),
  usuario: z.string().min(1, "Selecione um usuário"),
});

export type NewLoanFormValues = z.infer<typeof newLoanSchema>;
