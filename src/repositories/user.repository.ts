import UserModel, { User, UserDocument } from "../models/user.model";

interface UserRepositoryInterface {
  findById(id: string): Promise<UserDocument | null>;
  findByEmail(email: string): Promise<UserDocument | null>;
  create(user: UserDocument): Promise<UserDocument>;
  update(user: UserDocument): Promise<UserDocument | null>;
  softDeleteUser(id: string): Promise<boolean>;
}

class UserRepository implements UserRepositoryInterface {
  async findById(id: string): Promise<UserDocument | null> {
    return UserModel.findById(id).exec();
  }

  findByEmail(email: string): Promise<UserDocument | null> {
    return UserModel.findOne({ email });
  }

  createUser(user: User): Promise<UserDocument> {
    return UserModel.create(user);
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
