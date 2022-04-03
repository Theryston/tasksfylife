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
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
