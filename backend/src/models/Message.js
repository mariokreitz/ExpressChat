import { Schema, model } from "mongoose";

const messageSchema = new Schema({
  timestamp: { type: Date, required: true },
  sender: { type: String, ref: "User", required: true },
  content: { type: String, required: true },
});

export default model("Message", messageSchema);
