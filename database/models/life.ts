import mongoose from "mongoose";

const LifeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    cards: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Card",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Life || mongoose.model("Life", LifeSchema);
