import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { Button, Card, Input } from "../../../components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { ROUTES } from "../../../routes/routes";
import { Controller, useForm } from "react-hook-form";
import {
  newUserInitialData,
  newUserSchema,
  type NewUserFormValues,
} from "./schema";
import { USERS_QUERY_KEY } from "../constants/queries";
import { useMutation } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { useEffect, useState } from "react";
import useZipFinder from "../../../hooks/useZipFinder";

const UserForm = () => {
  const [zipCode, setZipCode] = useState("");
  const navigate = useNavigate();

  const { data: zipData, isLoadingZip } = useZipFinder(zipCode);

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newUserSchema),
    defaultValues: newUserInitialData,
  });

  const { mutateAsync: createUser, isPending: isCreatingUser } = useMutation({
    mutationKey: [USERS_QUERY_KEY.USERS_ADD],
    mutationFn: async () => {},
  });

  useEffect(() => {
    if (zipData) {
      console.log("save");
      setValue("address.state", zipData.uf);
      setValue("address.street", zipData.logradouro);
      setValue("address.neighborhood", zipData.bairro);
      setValue("address.city", zipData.localidade);
    }
  }, [zipData, setValue]);

  const debouncedSetZipCode = useDebouncedCallback((value: string) => {
    value = value.replace(/\D/g, "");
    if (value.length === 8) {
      console.log("cep", value);

      setZipCode(value);
    }
  }, 500);

  const onSubmit = async (values: NewUserFormValues) => {
    console.log(values);
    createUser();
  };

  return (
    <div className="flex flex-col h-screen w-full p-2">
      <div className="flex flex-col flex-none">
        <h1 className="text-4xl font-display font-bold mb-2">
          Cadastrar Cliente
        </h1>
        <p className="text-black/50">
          Preencha os dados para criar uma nova conta
        </p>
      </div>

      <Card className="flex-1 flex-col justify-start items-stretch overflow-hidden">
        <div className="flex items-center gap-3 flex-none mb-4">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-soft">
            <UserPlus className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="font-display">Dados do Usuário</p>
            <p className="text-black/50">Conta de cliente padrão</p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto space-y-6 pr-2"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <>
                    <label>Nome completo</label>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Nome do usuário"
                      className="transition-all duration-300 focus:shadow-soft w-full"
                    />
                  </>
                )}
              />
            </div>

            <div className="space-y-2">
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <>
                    <label>E-mail</label>
                    <Input
                      {...field}
                      type="email"
                      placeholder="usuario@email.com"
                      className="transition-all duration-300 focus:shadow-soft"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>

            <div className="space-y-2">
              <Controller
                control={control}
                name="birthDate"
                render={({ field }) => (
                  <>
                    <label>Data de nascimento</label>
                    <Input
                      type="date"
                      onChange={field.onChange}
                      className="transition-all duration-300 focus:shadow-soft"
                    />
                  </>
                )}
              />
            </div>

            <div className="space-y-2">
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <>
                    <label>Senha</label>
                    <Input
                      {...field}
                      type="password"
                      className="transition-all duration-300 focus:shadow-soft"
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm">
                        {errors.password.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>

            <div className="space-y-2">
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field }) => (
                  <>
                    <label>Confirmar senha</label>
                    <Input
                      {...field}
                      type="password"
                      className="transition-all duration-300 focus:shadow-soft"
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <p className="text-2xl font-semibold mb-2">Endereço</p>
              {isLoadingZip && <p className="text-black/50">Carregando...</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div>
                <Controller
                  control={control}
                  name="address.postalCode"
                  render={({ field }) => (
                    <>
                      <label>Cep</label>
                      <Input
                        value={field.value as string}
                        placeholder="Digite o CEP"
                        onChange={(e) => {
                          field.onChange(e);
                          debouncedSetZipCode(e.target.value);
                        }}
                      />
                    </>
                  )}
                />
              </div>
              <div>
                <Controller
                  name="address.street"
                  control={control}
                  render={({ field }) => (
                    <>
                      <label>Logradouro</label>
                      <Input
                        onChange={field.onChange}
                        value={field.value as string}
                        placeholder="Digite o logradouro"
                      />
                    </>
                  )}
                />
              </div>
              <div>
                <Controller
                  control={control}
                  name="address.number"
                  render={({ field }) => (
                    <>
                      <label>Número</label>
                      <Input
                        onChange={field.onChange}
                        value={field.value as string}
                        placeholder="Digite o número"
                      />
                    </>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div>
                <Controller
                  name="address.state"
                  control={control}
                  render={({ field }) => (
                    <>
                      <label>Estado</label>
                      <Input
                        onChange={field.onChange}
                        value={field.value as string}
                        placeholder="Digite o estado"
                      />
                    </>
                  )}
                />
              </div>
              <div>
                <Controller
                  name="address.city"
                  control={control}
                  render={({ field }) => (
                    <>
                      <label>Cidade</label>
                      <Input
                        onChange={field.onChange}
                        value={field.value as string}
                        placeholder="Digite a cidade"
                      />
                    </>
                  )}
                />
              </div>
              <div>
                <Controller
                  name="address.neighborhood"
                  control={control}
                  render={({ field }) => (
                    <>
                      <label>Bairro</label>
                      <Input
                        onChange={field.onChange}
                        value={field.value as string}
                        placeholder="Selecione o bairro"
                      />
                    </>
                  )}
                />
              </div>
            </div>
            <Controller
              control={control}
              name="address.complement"
              render={({ field }) => (
                <>
                  <label>Complemento</label>
                  <Input
                    className="mb-4"
                    onChange={field.onChange}
                    value={field.value as string}
                    placeholder="Digite um complemento"
                  />
                </>
              )}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={() => navigate(ROUTES.USERS)}
              className="flex-1 hover:bg-secondary"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isCreatingUser}
              className="flex-1 bg-primary hover:opacity-90 transition-all duration-300 shadow-soft hover:shadow-elegant"
            >
              {isCreatingUser ? "Cadastrando..." : "Cadastrar"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default UserForm;
