import { Schema, model } from "mongoose";

const messageSchema = new Schema({
  sender: { type: String, ref: "User", required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default model("Message", messageSchema);
