import mongoose, { Document } from "mongoose";

export interface UserDocument extends Document {}

const UserSchema = new mongoose.Schema({});

const UserModel = mongoose.model<UserDocument>("User", UserSchema);

export default UserModel;
