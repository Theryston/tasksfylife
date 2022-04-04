import slugify from "slugify";
import dbConnect from "../configs/dbConnect";
import ErrorApp from "../errors";
import { ILife, IUser } from "../interfaces/IUser";
import Life from "../models/Life";

export default class CreateLifeService {
  /**
   *
   * @param {IUser} user - User data
   * @returns {Promise<ILife>} Life data object.
   * @description Create a new life for the user. if already exists, return the existing life.
   */
  public static async execute({ user }: { user: IUser }): Promise<ILife> {
    if (!user) {
      throw new ErrorApp({
        message: "The user is required",
        status: 400,
      });
    }

    await dbConnect();

    let life = await Life.findOne({ user: user.id }).populate({
      path: "Card",
      strictPopulate: false,
    });

    if (!life) {
      const lifeByName = await Life.findOne({
        name: slugify(user.name?.toLocaleLowerCase() as string),
      });

      if (lifeByName) {
        life = await Life.create({
          name: slugify(
            user.name?.toLocaleLowerCase() +
              user.id.substring(user.id.length - 4, user.id.length)
          ),
          user: user.id,
          image: user.image,
          cards: [],
        });
      } else {
        life = await Life.create({
          name: slugify(user.name?.toLocaleLowerCase() as string),
          image: user.image,
          user: user.id,
          cards: [],
        });
      }
    }

    return life;
  }
}
