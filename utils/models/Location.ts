import { Schema, model, models } from "mongoose";

const LocationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Location || model("Location", LocationSchema);
