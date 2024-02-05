import bcrypt from "bcrypt";

import { RegisteredUserDocument, UserDocument } from "../models/user.model";
import UserRepository from "../repositories/user.repository";
import TokenService from "./token.service";

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

  signUp = async (
    user: RegisteredUserDocument
  ): Promise<string | null | Error> => {
    try {
      const existingUser = await this.userRepository.findUserByEmail(
        user.email
      );
      if (existingUser) {
        return new Error("Email is already in use");
      }
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const responseUser = await this.userRepository.createUser({
        ...user,
        password: hashedPassword,
      } as RegisteredUserDocument);
      if (!responseUser) return null;

      const token = TokenService.generateToken(
        responseUser._id,
        responseUser.email,
        responseUser.role
      );

      return token;
    } catch (error) {
      console.error("Error signing up user:", error);
      return null;
    }
  };

  signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<string | null> => {
    try {
      const user = await this.userRepository.findUserByEmail(email);
      if (!user) return null;
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return null;
      const token = TokenService.generateToken(user._id, user.email, user.role);
      return token;
    } catch (error) {
      console.error("Error signing in user:", error);
      return null;
    }
  };
}

export default UserService;
