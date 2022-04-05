import dbConnect from "../configs/dbConnect";
import { ITag } from "../interfaces/ICard";
import Tag from "../models/Tag";

export default class GetTagsServices {
  /**
   * @returns {Promise<ITag[]>} Promise of all tags in database
   */
  static async execute(): Promise<ITag[]> {
    await dbConnect();

    const tags = await Tag.find();

    return tags;
  }
}
