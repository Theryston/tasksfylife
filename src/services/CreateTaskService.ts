import dbConnect from "../configs/dbConnect";
import ErrorApp from "../errors";
import { ITask } from "../interfaces/ICard";
import Task from "../models/Task";

export default class CreateLifeService {
  /**
   * @param {string} label - The label of the task
   * @returns {Promise<Task>} Promise of the created task
   */
  static async execute({ label }: { label: string }): Promise<ITask> {
    if (!label) {
      throw new ErrorApp({
        message: "The label is required",
        status: 400,
      });
    }

    await dbConnect();

    const task = await Task.create({
      label,
    });

    return task;
  }
}
