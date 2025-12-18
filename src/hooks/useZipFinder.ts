import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "react-toastify";

const ZIP_CODE_URL = "https://viacep.com.br/ws";

interface ZipResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

const useZipFinder = (zipCode: string) => {
  const query = useQuery({
    queryKey: ["zip-code", zipCode],
    queryFn: async () => {
      const response = await fetch(`${ZIP_CODE_URL}/${zipCode}/json/`);

      const data: ZipResponse = await response.json();

      if (data?.erro) throw new Error("CEP não existente");

      return data;
    },
    enabled: !!zipCode,
    retry: false,
  });

  useEffect(() => {
    if (query.isError) toast.error('Erro ao carregar o CEP');
  }, [query.isError]);

  return { ...query, isLoadingZip: query.isLoading && query.isFetching };
};

export default useZipFinder;
