import mongoose, { Document, Schema } from "mongoose";

export interface User {
  _id: string;
  email: string;
  password: string;
  role: "user" | "admin";
  cartId: string | null;
}

export interface UserDocument extends Document {
  _id: string;
  email: string;
  password: string;
  role: "user" | "admin";
  cartId: string | null;
}

const UserSchema: Schema<UserDocument> = new mongoose.Schema({
  _id: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  cartId: { type: String, default: null },
});

const UserModel = mongoose.model<UserDocument>("User", UserSchema);

export default UserModel;
