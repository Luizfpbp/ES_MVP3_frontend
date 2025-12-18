import { Plus } from "lucide-react";
import { Button } from "../../components/ui";
import { useQuery } from "@tanstack/react-query";
import { HOME_QUERY_KEY } from "./constants/queries";
import { mockBooks } from "./constants/mockbooks";
import BookCard from "./components/BookCard";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";

const Home = () => {
  const navigate = useNavigate();

  const { data: booksList } = useQuery({
    queryKey: [HOME_QUERY_KEY.BOOKS_LIST],
    queryFn: () => mockBooks,
  });

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

      <div className="grid grid-cols-2 gap-4 overflow-y-auto flex-1 pr-1">
        {booksList?.map((book, index) => {
          return <BookCard key={index} index={index} book={book} />;
        })}
      </div>
    </div>
  );
};

export default Home;
