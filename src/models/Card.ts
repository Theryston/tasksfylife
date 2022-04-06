import mongoose from "mongoose";
import "./Task";
import "./Tag";

const CardSchema = new mongoose.Schema(
  {
    life: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Life",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tasks: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Task",
    },
    tags: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Tag",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Card || mongoose.model("Card", CardSchema);
