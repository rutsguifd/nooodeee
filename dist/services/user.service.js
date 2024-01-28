"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const JWT_SECRET = process.env.JWT_SECRET || "my-jwt-secret";
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "2h";
const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;
class UserService {
    constructor() {
        this.getUserById = (id) => this.userRepository
            .findById(id)
            .then((user) => (user ? user.toObject() : null));
        this.createUser = (user) => this.userRepository
            .create(user)
            .then((createdUser) => createdUser.toObject());
        this.updateUser = (user, cartId) => __awaiter(this, void 0, void 0, function* () {
            if (cartId) {
                user.cartId = cartId;
            }
            return this.userRepository.update(user);
        });
        this.softDeleteUser = (id) => this.userRepository.softDeleteUser(id);
        this.userRepository = new user_repository_1.default();
    }
    registerUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcrypt_1.default.hash(password, SALT_ROUNDS);
            const _id = (0, uuid_1.v4)();
            const user = {
                _id,
                email,
                password: hashedPassword,
                role: "user",
                cartId: null,
            };
            const newUser = yield this.userRepository.createUser(user);
            return this.generateToken(newUser);
        });
    }
    loginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByEmail(email);
            if (!user) {
                return null;
            }
            const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!passwordMatch) {
                return null;
            }
            return this.generateToken(user);
        });
    }
    generateToken(user) {
        return jsonwebtoken_1.default.sign({
            userId: user._id,
            email: user.email,
            role: user.role,
        }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
    }
    verifyToken(token) {
        try {
            const decodedToken = jsonwebtoken_1.default.verify(token, JWT_SECRET);
            return decodedToken;
        }
        catch (error) {
            return null;
        }
    }
}
exports.default = UserService;
