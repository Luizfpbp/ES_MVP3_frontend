export enum UserType {
  ADMIN = "admin",
}

export interface Session {
  user: UserType;
}
