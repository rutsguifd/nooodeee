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
const user_service_1 = __importDefault(require("../services/user.service"));
class UserController {
    constructor() {
        this.getUserById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            try {
                const user = yield this.userService.getUserById(userId);
                if (user) {
                    res.status(200).json(user);
                }
                else {
                    res.status(404).json({ error: "User not found" });
                }
            }
            catch (error) {
                console.error("Error getting user by ID:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const newUser = req.body;
            try {
                const createdUser = yield this.userService.createUser(newUser);
                res.status(201).json(createdUser);
            }
            catch (error) {
                console.error("Error creating user:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
        this.softDeleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            try {
                const result = yield this.userService.deleteUser(userId);
                if (result) {
                    res.status(200).json({ message: "User deleted successfully" });
                }
                else {
                    res.status(404).json({ error: "User not found" });
                }
            }
            catch (error) {
                console.error("Error deleting user:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
        this.signUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, role } = req.body;
                const tokenOrError = yield this.userService.signUp({
                    email,
                    password,
                    role,
                });
                if (typeof tokenOrError === "string") {
                    res.status(201).json({ token: tokenOrError });
                }
                else if (tokenOrError instanceof Error) {
                    res.status(409).json({ error: tokenOrError.message });
                }
                else {
                    res.status(500).json({ error: "Internal Server Error" });
                }
            }
            catch (error) {
                console.error("Error signing up user:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
        this.signIn = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const token = yield this.userService.signIn({ email, password });
            if (!token) {
                res.status(401).json({ message: "Invalid email or password" });
                return;
            }
            res.status(200).json({ token });
        });
        this.userService = new user_service_1.default();
    }
}
exports.default = UserController;
