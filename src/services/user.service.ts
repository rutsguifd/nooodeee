import { UserDocument } from "../models/user.model";
import UserRepository from "../repositories/user.repository";

class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  getUserById: (id: string) => Promise<UserDocument | null> = (id: string) =>
    this.userRepository.findById(id);

  createUser: (user: UserDocument) => Promise<UserDocument> = (
    user: UserDocument
  ) => this.userRepository.create(user);

  deleteUser: (id: string) => Promise<boolean> = (id: string) =>
    this.userRepository.deleteUser(id);
}

export default UserService;
