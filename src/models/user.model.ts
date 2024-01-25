import mongoose, { Document } from "mongoose";

export interface User {
  username: string;
  email: string;
  cartId: string | null;
  isDeleted: { type: Boolean; default: false };
}

export interface UserDocument extends User, Document {}

const UserSchema = new mongoose.Schema<UserDocument>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  cartId: { type: String, default: null },
});

const UserModel = mongoose.model<UserDocument>("User", UserSchema);

export default UserModel;
