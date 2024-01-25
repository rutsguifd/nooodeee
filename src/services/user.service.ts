import { User, UserDocument } from "../models/user.model";
import UserRepository from "../repositories/user.repository";

class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  getUserById: (id: string) => Promise<User | null> = (id: string) =>
    this.userRepository
      .findById(id)
      .then((user) => (user ? user.toObject() : null));

  createUser: (user: UserDocument) => Promise<User> = (user: UserDocument) =>
    this.userRepository
      .create(user)
      .then((createdUser) => createdUser.toObject());

  updateUser: (
    user: UserDocument,
    cartId?: string | null
  ) => Promise<User | null> = async (
    user: UserDocument,
    cartId?: string | null
  ) => {
    if (cartId) {
      user.cartId = cartId;
    }

    return this.userRepository.update(user);
  };

  softDeleteUser: (id: string) => Promise<boolean> = (id: string) =>
    this.userRepository.softDeleteUser(id);
}

export default UserService;
