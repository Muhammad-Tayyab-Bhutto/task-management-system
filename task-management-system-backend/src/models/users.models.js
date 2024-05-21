import mongoose from "mongoose";
import bcrypt from "bcrypt";

const usersSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 10,
      validate(value) {
        if (!value.match(/^[a-zA-Z0-9]+$/)) {
          throw new Error("Username must be alphanumeric");
        }
      },
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    }
  },
  {
    timestamps: true,
  }
);

// Middleware to hash password before saving
usersSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

// Method to compare passwords
usersSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}

export const Users = mongoose.model('Users', usersSchema);
