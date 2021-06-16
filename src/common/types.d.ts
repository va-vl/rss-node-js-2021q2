export interface IUser {
  id?: string;
  name?: string;
  login?: string;
  password?: string;
}

export type UserDTO = Omit<IUser, 'id'>;
