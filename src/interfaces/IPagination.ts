import { ILife } from "./IUser";

export interface IPagination {
  page: number;
  limit: number;
}

export interface ILivesPaginated {
  lives: ILife[];
  page: number;
  limit: number;
  total: number;
  hasNextPage: boolean;
}
