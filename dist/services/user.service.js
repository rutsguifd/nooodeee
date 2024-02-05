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
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
const token_service_1 = __importDefault(require("./token.service"));
class UserService {
    constructor() {
        this.getUserById = (id) => this.userRepository.findById(id);
        this.createUser = (user) => this.userRepository.create(user);
        this.deleteUser = (id) => this.userRepository.deleteUser(id);
        this.signUp = (user) => __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield this.userRepository.findUserByEmail(user.email);
                if (existingUser) {
                    return new Error("Email is already in use");
                }
                const hashedPassword = yield bcrypt_1.default.hash(user.password, 10);
                const responseUser = yield this.userRepository.createUser(Object.assign(Object.assign({}, user), { password: hashedPassword }));
                if (!responseUser)
                    return null;
                const token = token_service_1.default.generateToken(responseUser._id, responseUser.email, responseUser.role);
                return token;
            }
            catch (error) {
                console.error("Error signing up user:", error);
                return null;
            }
        });
        this.signIn = ({ email, password, }) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findUserByEmail(email);
                if (!user)
                    return null;
                const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
                if (!isPasswordValid)
                    return null;
                const token = token_service_1.default.generateToken(user._id, user.email, user.role);
                return token;
            }
            catch (error) {
                console.error("Error signing in user:", error);
                return null;
            }
        });
        this.userRepository = new user_repository_1.default();
    }
}
exports.default = UserService;
