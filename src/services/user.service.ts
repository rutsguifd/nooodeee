import UserRepository from "../repositories/user.repository";
import User from "../models/user.model";

class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  getUserById(id: string): User | undefined {
    return this.userRepository.findById(id);
  }

  getUserByUsername(username: string): User | undefined {
    return this.userRepository.findByUsername(username);
  }

  createUser(user: User): User {
    return this.userRepository.create(user);
  }

  updateUser(user: User): User | undefined {
    return this.userRepository.update(user);
  }

  softDeleteUser(id: string): boolean {
    return this.userRepository.softDeleteUser(id);
  }
}

export default UserService;
