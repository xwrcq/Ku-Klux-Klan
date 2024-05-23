import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    nickname: {
      type: String,
      unique: true,
      required: true,
      minlength: 3,
      maxlength: 15,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      minlength: 4,
      maxlength: 50,
    },
    password: { type: String, required: true, minlength: 6, maxlength: 50 },
    isAdmin: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;