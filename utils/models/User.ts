import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    displayName: {
      type: String,
      required: true,
    },

    photoURL: {
      type: String,
      required: false,
    },
    sessionCode: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    uid: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    location: {
      type: Schema.Types.ObjectId,
      ref: "Location",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default models.User || model("User", UserSchema);
