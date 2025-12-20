import { z } from "zod";

export const newUserInitialData: NewUserFormValues = {
  nome: "",
  email: "",
  data_nascimento: "",
  address: {
    postalCode: "",
    state: "",
    city: "",
    street: "",
    neighborhood: "",
    number: "",
    complement: "",
  },
};

export const newUserSchema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.email("E-mail inválido"),
  data_nascimento: z.string("Data inválida"),
  address: z.object({
    postalCode: z.string().optional(),
    state: z.string().optional(),
    city: z.string().optional(),
    street: z.string().optional(),
    neighborhood: z.string().optional(),
    number: z.string().optional(),
    complement: z.string().optional(),
  }),
});

export type NewUserFormValues = z.infer<typeof newUserSchema>;
