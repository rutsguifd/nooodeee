import UserModel, {
  RegisteredUserDocument,
  UserDocument,
} from "../models/user.model";

interface UserRepositoryInterface {
  findById(id: string): Promise<UserDocument | null>;
  findByUsername(username: string): Promise<UserDocument | null>;
  findUserByEmail(email: string): Promise<RegisteredUserDocument | null>;
  create(user: UserDocument): Promise<UserDocument>;
  createUser(
    user: RegisteredUserDocument
  ): Promise<RegisteredUserDocument | null>;
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

  createUser = async (
    user: RegisteredUserDocument
  ): Promise<RegisteredUserDocument | null> => {
    try {
      const responseUser = await UserModel.create({
        userType: "RegisteredUser",
        ...user,
      });
      return responseUser as RegisteredUserDocument;
    } catch (error) {
      console.error("Error creating user:", error);
      return null;
    }
  };

  findUserByEmail = async (
    email: string
  ): Promise<RegisteredUserDocument | null> => {
    try {
      const user = await UserModel.findOne({
        userType: "RegisteredUser",
        email,
      });
      return user as RegisteredUserDocument;
    } catch (error) {
      console.error("Error finding user by email:", error);
      return null;
    }
  };
}

export default UserRepository;
