import UserModel, { UserDocument } from "../models/user.model";

interface UserRepositoryInterface {
  findById(id: string): Promise<UserDocument | null>;
  findByUsername(username: string): Promise<UserDocument | null>;
  create(user: UserDocument): Promise<UserDocument>;
  update(user: UserDocument): Promise<UserDocument | null>;
  softDeleteUser(id: string): Promise<boolean>;
}

class UserRepository implements UserRepositoryInterface {
  async findById(id: string): Promise<UserDocument | null> {
    return UserModel.findById(id).exec();
  }

  async findByUsername(username: string): Promise<UserDocument | null> {
    return UserModel.findOne({ username, isDeleted: false }).exec();
  }

  async create(user: UserDocument): Promise<UserDocument> {
    return UserModel.create(user);
  }

  async update(user: UserDocument): Promise<UserDocument | null> {
    return UserModel.findByIdAndUpdate(user._id.toString(), user, {
      new: true,
    }).exec();
  }

  async softDeleteUser(id: string): Promise<boolean> {
    const result = await UserModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    ).exec();
    return !!result;
  }
}

export default UserRepository;
