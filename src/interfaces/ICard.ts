export interface ICard {
  _id: string;
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
