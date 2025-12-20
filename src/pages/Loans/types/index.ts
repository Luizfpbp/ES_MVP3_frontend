import type { BookDTO } from "../../Home/types";
import type { UserDTO } from "../../Users/types";

export type LoanDTO = {
  id: number;
  livro_id: number;
  usuario_id: number;
  devolvido: boolean;
  livro: BookDTO;
  usuario: UserDTO;
  data_devolucao: string | null;
  data_emprestimo: string;
};

export interface LoanListDTO {
  values: LoanDTO[];
}
