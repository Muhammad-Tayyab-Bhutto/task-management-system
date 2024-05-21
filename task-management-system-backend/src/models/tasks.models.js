import mongoose, { mongo } from "mongoose";

const tasksSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    assignedUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    }
  },
  {
    timestamps: true,
  }
);
