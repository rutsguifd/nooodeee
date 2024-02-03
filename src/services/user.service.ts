import { UserDocument } from "../models/user.model";
import UserRepository from "../repositories/user.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

const JWT_SECRET = process.env.JWT_SECRET || "my-jwt-secret";
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "2h";
const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;

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
