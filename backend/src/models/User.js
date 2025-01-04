import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: String,
  status: { type: String, default: "offline" },
});

export default model("User", userSchema);
