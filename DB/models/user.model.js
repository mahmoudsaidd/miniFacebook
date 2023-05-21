import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    isConfirmed: {
      type: Boolean,
      default: false,
    },

    OTPCode: String,
    profilePic: String,

    coverPics: Array,
  },
  {
    timestamps: true,
  }
);

export const userModel = mongoose.model("user", userSchema);
