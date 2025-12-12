import { Plus } from "lucide-react";
import { useState } from "react";
import { useSessionStore } from "../../store/useSessionStore";
import { UserType } from "../../store/types";
import { Button, Card, Input, Select } from "../../components/ui";
import { BookGenreFilterOptions } from "./constants/FilterOptions";
import { useQuery } from "@tanstack/react-query";
import { HOME_QUERY_KEY } from "./constants/queries";
import { mockBooks } from "./components/mockbooks";
import BookCard from "./components/BookCard";

const Home = () => {
  const { canUserSee } = useSessionStore();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: booksList } = useQuery({
    queryKey: [HOME_QUERY_KEY.LIST_BOOKS, searchTerm],
    queryFn: () => mockBooks,
  });

  return (
    <div className="flex flex-col h-screen w-full p-2">
      <div className="flex w-full justify-between flex-none">
        <div className="flex flex-col items-start">
          <h1 className="font-display font-bold mb-2">Catálogo de Livros</h1>
          <p className="text-black/50">Explore nosso acervo literário</p>
        </div>
        {canUserSee(UserType.ADMIN) && (
          <Button className="flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Livro
          </Button>
        )}
      </div>

      <div className="flex flex-col my-2 flex-none">
        <Card className="flex-row">
          <Input
            placeholder="Buscar por título ou autor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Select
            placeholder="Filtrar por gênero"
            options={BookGenreFilterOptions}
          />
        </Card>
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
