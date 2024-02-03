import UserModel, { UserDocument } from "../models/user.model";

interface UserRepositoryInterface {
  findById(id: string): Promise<UserDocument | null>;
  findByUsername(username: string): Promise<UserDocument | null>;
  create(user: UserDocument): Promise<UserDocument>;
  deleteUser(id: string): Promise<boolean>;
}

class UserRepository implements UserRepositoryInterface {
  async findById(id: string): Promise<UserDocument | null> {
    return UserModel.findById(id).exec();
  }

  async findByUsername(username: string): Promise<UserDocument | null> {
    return UserModel.findOne({ username }).exec();
  }

  async create(user: UserDocument): Promise<UserDocument> {
    return UserModel.create(user);
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await UserModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}

export default UserRepository;
