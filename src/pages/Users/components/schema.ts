import { z } from "zod";

export const newUserInitialData: NewUserFormValues = {
  name: "",
  email: "",
  birthDate: "",
  password: "",
  confirmPassword: "",
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

export const newUserSchema = z
  .object({
    name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    email: z.email("E-mail inválido"),
    birthDate: z.string().optional(),
    password: z.string("A senhã é obrigatória").min(1, "A senhã é obrigatória"),
    confirmPassword: z.string("A confirmação da senha é obrigatória"),
    address: z.object({
      postalCode: z.string().optional(),
      state: z.string().optional(),
      city: z.string().optional(),
      street: z.string().optional(),
      neighborhood: z.string().optional(),
      number: z.string().optional(),
      complement: z.string().optional(),
    }),
  })
  .refine(
    (data) => {
      if (!data.password) return true;
      return data.password === data.confirmPassword;
    },
    {
      message: "As senhas digitadas são diferentes",
      path: ["confirmPassword"],
    }
  );

export type NewUserFormValues = z.infer<typeof newUserSchema>;
