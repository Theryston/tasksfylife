import dbConnect from "../configs/dbConnect";
import ErrorApp from "../errors";
import { ITag } from "../interfaces/ICard";
import Tag from "../models/Tag";

export default class CreateTagService {
  /**
   * @param {string} label - The label of the tag
   * @returns {Promise<ITag>} Promise of the created tag
   */
  static async execute({ label }: { label: string }): Promise<ITag> {
    if (!label) {
      throw new ErrorApp({
        message: "The label is required",
        status: 400,
      });
    }

    await dbConnect();

    const tag = await Tag.create({
      label,
    });

    return tag;
  }
}
