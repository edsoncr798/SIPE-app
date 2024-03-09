export interface IJob {
  uid?: string;
  user_uid?: string;
  post: string;
  company: string;
  type_work_place: ETypeWorkPlace;
  work_location: string;
  job_type: EJobType;
  created_at?: string | Date;
  updated_at?: string | Date;
}

export enum ETypeWorkPlace {
  remote = "Remoto",
  office = "Presencial",
  hybrid = "Híbrido",
}

export enum EJobType {
  fullTime = "Tiempo completo",
  partTime = "Medio tiempo",
  freelance = "Freelance",
  internship = "Prácticas",
  temporary = "Temporal",
  other = "Otro",
}

