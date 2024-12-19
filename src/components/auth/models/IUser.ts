export interface ILogin {
  email: string;
  password: string;
}

export interface IUser {
  uid: string;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  created_at?: Date;
  updated_at?: Date;
}