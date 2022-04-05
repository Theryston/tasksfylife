import mongoose from "mongoose";

const LeftSchema = new mongoose.Schema(
  {
    pushToLeftByLife: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Life",
    },
    belongsToLife: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Life",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Left || mongoose.model("Left", LeftSchema);
