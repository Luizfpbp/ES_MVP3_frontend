import { BookOpen } from "lucide-react";
import { Badge, Card } from "../../../components/ui";
import type { BookDTO } from "../types";

interface BookCardProps {
  index: number;
  book: BookDTO;
}

const BookCard = ({ index, book }: BookCardProps) => {
  return (
    <Card
      key={book.id}
      className="max-w-md w-full justify-between items-baseline shadow-soft border-border/50"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex w-full items-center justify-between mb-2">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-soft">
          <BookOpen className="w-6 h-6 text-accent-foreground" />
        </div>
        <Badge variant={book.disponivel > 0 ? "default" : "secondary"}>
          {book.disponivel > 0 ? "Disponível" : "Indisponível"}
        </Badge>
      </div>
      <p className="text-black font-display text-xl">{book.titulo}</p>
      <p className="text-sm text-black/50">{book.autor}</p>
      <div className="w-full space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Gênero:</span>
          <span className="font-medium">{book.genero}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Ano:</span>
          <span className="font-medium">{book.lancamento}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Cópias:</span>
          <span className="font-medium">{book.disponivel}</span>
        </div>
      </div>
    </Card>
  );
};

export default BookCard;
