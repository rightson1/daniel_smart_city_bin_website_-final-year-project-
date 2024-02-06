import { Schema, model, models, Types } from "mongoose";

const BinSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: Types.ObjectId,
      ref: "Location",
      required: true,
    },
    level: {
      type: Number,
      required: true,
      default: 0,
    },
    googleLocation: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ["Point"], // 'location.type' must be 'Point'
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },

  {
    timestamps: true,
  }
);

export default models.Bin || model("Bin", BinSchema);
