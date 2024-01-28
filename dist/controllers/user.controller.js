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
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            const updatedUser = req.body;
            try {
                const user = yield this.userService.updateUser(Object.assign(Object.assign({}, updatedUser), { id: userId }));
                if (user) {
                    res.status(200).json(user);
                }
                else {
                    res.status(404).json({ error: "User not found" });
                }
            }
            catch (error) {
                console.error("Error updating user:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
        this.softDeleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            try {
                const result = yield this.userService.softDeleteUser(userId);
                if (result) {
                    res.status(200).json({ message: "User soft-deleted successfully" });
                }
                else {
                    res.status(404).json({ error: "User not found" });
                }
            }
            catch (error) {
                console.error("Error soft-deleting user:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
        this.userService = new user_service_1.default();
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const token = yield this.userService.registerUser(email, password);
                res.status(201).json({ token });
            }
            catch (error) {
                console.error("Error registering user:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const token = yield this.userService.loginUser(email, password);
                if (!token) {
                    res.status(401).json({ error: "Unauthorized: Invalid credentials" });
                    return;
                }
                res.json({ token });
            }
            catch (error) {
                console.error("Error logging in:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
}
exports.default = UserController;
