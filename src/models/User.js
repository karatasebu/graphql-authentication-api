import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
});

export default mongoose.model("User", userSchema);
