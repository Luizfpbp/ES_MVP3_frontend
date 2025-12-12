import { BookOpen } from "lucide-react";
import { Badge, Button, Card } from "../../../components/ui";
import type { bookDTO } from "./mockbooks";

interface BookCardProps {
  index: number;
  book: bookDTO;
}

const BookCard = ({ index, book }: BookCardProps) => {
  return (
    <Card
      key={`${book.title}-${index}`}
      className="justify-between items-baseline w-full shadow-soft hover:shadow-elegant transition-all duration-300 border-border/50 animate-in fade-in slide-in-from-bottom-4"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex w-full items-center justify-between mb-2">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-soft">
          <BookOpen className="w-6 h-6 text-accent-foreground" />
        </div>
        <Badge variant={book.available ? "default" : "secondary"}>
          {book.available ? "Disponível" : "Indisponível"}
        </Badge>
      </div>
      <p className="text-black font-display text-xl">{book.title}</p>
      <p className="text-sm text-black/50">{book.author}</p>
      <div className="w-full space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Gênero:</span>
          <span className="font-medium">{book.genre}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Ano:</span>
          <span className="font-medium">{book.year}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Cópias:</span>
          <span className="font-medium">{book.copies}</span>
        </div>
      </div>
      <Button
        className="w-full bg-primary hover:opacity-90 transition-all duration-300"
        disabled={!book.available}
      >
        {book.available ? "Ver Detalhes" : "Indisponível"}
      </Button>
    </Card>
  );
};

export default BookCard;
