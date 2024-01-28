import { User, UserDocument } from "../models/user.model";
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

  async registerUser(email: string, password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const _id = uuidv4();
    const user: User = {
      _id,
      email,
      password: hashedPassword,
      role: "user",
      cartId: null,
    };
    const newUser = await this.userRepository.createUser(user);
    return this.generateToken(newUser);
  }

  async loginUser(email: string, password: string): Promise<string | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return null;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return null;
    }

    return this.generateToken(user);
  }

  generateToken(user: UserDocument): string {
    return jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRATION }
    );
  }

  verifyToken(
    token: string
  ): { userId: string; email: string; role: string } | null {
    try {
      const decodedToken = jwt.verify(token, JWT_SECRET) as {
        userId: string;
        email: string;
        role: string;
      };
      return decodedToken;
    } catch (error) {
      return null;
    }
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
