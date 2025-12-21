import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "react-toastify";

const ZIP_CODE_URL = "https://brasilapi.com.br/api/cep/v1";

interface ZipResponse {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
}

const useZipFinder = (zipCode: string) => {
  const query = useQuery({
    queryKey: ["zip-code", zipCode],
    queryFn: async () => {
      const response = await fetch(`${ZIP_CODE_URL}/${zipCode}`);

      const data: ZipResponse = await response.json();

      if (!response.ok) {
        throw new Error("Erro ao carregar cep");
      }

      return data;
    },
    enabled: !!zipCode,
    retry: false,
  });

  useEffect(() => {
    if (query.isError) toast.error("Erro ao carregar o CEP");
  }, [query.isError]);

  return { ...query, isLoadingZip: query.isLoading && query.isFetching };
};

export default useZipFinder;
