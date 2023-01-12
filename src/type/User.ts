// TODO: doctrings
export interface User {
  id: string;
  login: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserWithPassword extends User {
  password: string;
}

export type TokenRequest = {
  login: string;
  password: string;
};

export type Token = {
  token: string;
};
