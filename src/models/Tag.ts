import mongoose from "mongoose";

const TagSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Tag || mongoose.model("Tag", TagSchema);
