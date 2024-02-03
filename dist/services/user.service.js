"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
class UserService {
    constructor() {
        this.getUserById = (id) => this.userRepository.findById(id);
        this.createUser = (user) => this.userRepository.create(user);
        this.deleteUser = (id) => this.userRepository.deleteUser(id);
        this.userRepository = new user_repository_1.default();
    }
}
exports.default = UserService;
