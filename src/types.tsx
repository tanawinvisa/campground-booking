export interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
}

export interface NewUser {
  email: string;
  password: string;
  name: string;
  tel: string;
  role: string;
}
