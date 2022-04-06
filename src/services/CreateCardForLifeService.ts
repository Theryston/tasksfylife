import ErrorApp from "../errors";
import { ICard } from "../interfaces/ICard";
import Card from "../models/Card";
import Life from "../models/Life";

interface ICardData {
  title: string;
  description: string;
  tags: string[];
  tasks: string[];
}

export default class CreateCardForLifeService {
  /**
   * @param {string} lifeId - id of the life to create the card
   * @param {ICardData} cardData - data to create the card
   * @returns {Promise<ICard>} Data of created card
   */
  static async execute(lifeId: string, cardData: ICardData): Promise<ICard> {
    if (!lifeId) {
      throw new ErrorApp({
        message: "The life id is required",
        status: 400,
      });
    }

    if (!cardData.title) {
      throw new ErrorApp({
        message: "The title is required",
        status: 400,
      });
    }

    if (!cardData.description) {
      throw new ErrorApp({
        message: "The description is required",
        status: 400,
      });
    }

    if (!cardData.tags || cardData.tags.length === 0) {
      throw new ErrorApp({
        message: "The tags are required",
        status: 400,
      });
    }

    if (!cardData.tasks || cardData.tasks.length === 0) {
      throw new ErrorApp({
        message: "The tasks are required",
        status: 400,
      });
    }

    const card = await Card.create({
      life: lifeId,
      title: cardData.title,
      description: cardData.description,
      tags: cardData.tags,
      tasks: cardData.tasks,
    });

    await Life.findOneAndUpdate(
      { _id: lifeId },
      { $push: { cards: card._id } }
    );

    return card;
  }
}
