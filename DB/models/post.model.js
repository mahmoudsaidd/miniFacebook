
import mongoose from "mongoose";


const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    postImg: {
      type: String,
      required: true,
    },

    createdBy: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "user", required: true },
       
    likes: [{
       type: mongoose.Schema.Types.ObjectId,
        ref: "user" }],

    unLikes: [{ 
      type: mongoose.Schema.Types.ObjectId,
       ref: "user" }],

    totalCounts: { type:Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const postModel = mongoose.model("post", postSchema);
