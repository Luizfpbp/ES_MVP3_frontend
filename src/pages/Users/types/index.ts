export type AddressDTO = {
  city: string;
  complement: string;
  neighborhood: string;
  number: string;
  postalCode: string;
  state: string;
  street: string;
};

export type UserDTO = {
  id: 1;
  nome: string;
  email: string;
  data_nascimento: string;
  address: AddressDTO;
};

export interface UserListDTO {
  values: UserDTO[];
}
