export interface ILogin {
  email: string;
  password: string;
}

export interface IUser {
  uid: string;
  first_name: string;
  last_name: string;
  email: string;
  career: string;
  photo: string ;
  phone: string ;
  language?: string;
  background_photo: string;
  country?: string;
  city?: string;
  password?: string;
  work_experience: string;
  education: string;
  skills: string ;
  summary: string;
  created_at?: Date;
  updated_at?: Date;
}