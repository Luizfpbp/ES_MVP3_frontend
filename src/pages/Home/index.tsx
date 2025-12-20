import { Plus } from "lucide-react";
import { Button } from "../../components/ui";
import { useQuery } from "@tanstack/react-query";
import { HOME_QUERY_KEY } from "./constants/queries";
import BookCard from "./components/BookCard";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import { useEffect } from "react";
import { toast } from "react-toastify";
import type { BookListDTO } from "./types";

const DB_URL = import.meta.env.VITE_API_URL;

const Home = () => {
  const navigate = useNavigate();

  const { data: booksList, isError } = useQuery<BookListDTO>({
    queryKey: [HOME_QUERY_KEY.BOOKS_LIST],
    queryFn: async () => {
      const url = `${DB_URL}/livros`;

      const response = await fetch(url);
      return await response.json();
    },
  });

  useEffect(() => {
    if (isError) toast.error("Erro ao buscar os livros");
  }, [isError]);

  return (
    <div className="flex flex-col h-screen w-full p-2">
      <div className="flex w-full justify-between flex-none">
        <div className="flex flex-col items-start">
          <h1 className="font-display font-bold mb-2">Catálogo de Livros</h1>
          <p className="text-black/50">Explore nosso acervo literário</p>
        </div>
        <Button
          onClick={() => navigate(ROUTES.NEW_BOOKS)}
          className="flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Livro
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 overflow-y-auto flex-1 place-items-start">
        {booksList?.values.map((book, index) => {
          return <BookCard key={index} index={index} book={book} />;
        })}
      </div>
    </div>
  );
};

export default Home;
