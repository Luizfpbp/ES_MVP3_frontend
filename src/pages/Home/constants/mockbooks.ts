export type bookDTO = {
  id: string;
  title: string;
  author: string;
  genre: string;
  year: string;
  available: boolean;
  copies: number;
};

export const mockBooks: bookDTO[] = [
  {
    id: "1",
    title: "Dom Casmurro",
    author: "Machado de Assis",
    genre: "Romance",
    year: "1899",
    available: true,
    copies: 3,
  },
  {
    id: "2",
    title: "Grande Sertão: Veredas",
    author: "Guimarães Rosa",
    genre: "Romance",
    year: "1956",
    available: true,
    copies: 2,
  },
  {
    id: "3",
    title: "O Cortiço",
    author: "Aluísio Azevedo",
    genre: "Naturalismo",
    year: "1890",
    available: false,
    copies: 0,
  },
  {
    id: "4",
    title: "Memórias Póstumas de Brás Cubas",
    author: "Machado de Assis",
    genre: "Romance",
    year: "1881",
    available: true,
    copies: 4,
  },
  {
    id: "5",
    title: "Capitães da Areia",
    author: "Jorge Amado",
    genre: "Romance",
    year: "1937",
    available: true,
    copies: 2,
  },
  {
    id: "6",
    title: "Vidas Secas",
    author: "Graciliano Ramos",
    genre: "Romance",
    year: "1938",
    available: false,
    copies: 0,
  },
];

export const booksOptions = [
  { value: "1", label: "Clean Code" },
  { value: "2", label: "Refactoring" },
  { value: "3", label: "Design Patterns" },
  { value: "4", label: "You Don't Know JS" },
  { value: "5", label: "The Pragmatic Programmer" },
];
