import { ICard } from "./ICard";

export interface IUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export interface ILife {
  _id: string;
  name: string;
  user: IUser;
  cards: ICard[];
  lefts: ILeft[];
  createdAt: Date;
  image?: string | null;
  updatedAt: Date;
  __v: number;
  number?: number;
}

export interface ILeft {
  _id: string;
  belongsToLife: ILife | string;
  pushToLeftByLife: ILife | string;
}
