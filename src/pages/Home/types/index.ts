export type BookDTO = {
  id: number;
  autor: string;
  disponivel: number;
  genero: string;
  lancamento: string;
  titulo: string;
};

export interface BookListDTO {
  values: BookDTO[];
}
