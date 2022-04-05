import { ILife } from "./IUser";

export interface ICard {
  _id: string;
  life: ILife | string;
  title: string;
  tasks: ITask[] | string;
  tags: ITag[] | string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITask {
  _id: string;
  label: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITag {
  _id: string;
  label: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
