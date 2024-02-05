import mongoose, { Document, Schema } from "mongoose";

const UserSchema = new Schema({}, { discriminatorKey: "userType" });

export interface UserDocument extends Document {}

export interface RegisteredUserDocument extends Document {
  email: string;
  password: string;
  role: "USER" | "ADMIN";
}

const RegisteredUserSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
});

UserSchema.discriminator("RegisteredUser", RegisteredUserSchema);

const UserModel = mongoose.model<UserDocument>("User", UserSchema);

export default UserModel;
