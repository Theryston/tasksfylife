import mongoose from "mongoose";

const LifeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    cards: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Card",
    },
    lefts: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Left",
    },
  },
  {
    timestamps: true,
  }
);

const Life = mongoose.models.Life || mongoose.model("Life", LifeSchema);

export default Life;
