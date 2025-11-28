export enum UserType {
  ADMIN = "admin",
  CLIENT = "client",
}

export interface ISession {
  user: UserType;
}
