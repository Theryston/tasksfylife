import dbConnect from "../configs/dbConnect";
import { IPagination, ILivesPaginated } from "../interfaces/IPagination";
import { ILife } from "../interfaces/IUser";
import Life from "../models/Life";

export default class FindLivesService {
  /**
   * @param {IPagination} paginationParams - Datas for pagination
   * @returns {Promise<ILivesPaginated>} Data of lives paginated
   */
  static async execute(
    paginationParams: IPagination
  ): Promise<ILivesPaginated> {
    await dbConnect();

    const lives: ILife[] = await Life.find()
      .limit(paginationParams.limit)
      .skip(paginationParams.page * paginationParams.limit)
      .sort({ "lefts.length": -1 })
      .populate({
        path: "cards",
        populate: {
          path: "tasks tags life",
        },
      })
      .populate({
        path: "lefts",
        populate: {
          path: "pushToLeftByLife belongsToLife",
        },
      });
    const total = await Life.countDocuments();

    return {
      page: paginationParams.page,
      limit: paginationParams.limit,
      total,
      hasNextPage: paginationParams.page * paginationParams.limit < total,
      lives,
    };
  }
}
