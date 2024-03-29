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
const user_model_1 = __importDefault(require("../models/user.model"));
class UserRepository {
    constructor() {
        this.createUser = (user) => __awaiter(this, void 0, void 0, function* () {
            try {
                const responseUser = yield user_model_1.default.create(Object.assign({ userType: "RegisteredUser" }, user));
                return responseUser;
            }
            catch (error) {
                console.error("Error creating user:", error);
                return null;
            }
        });
        this.findUserByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.findOne({
                    userType: "RegisteredUser",
                    email,
                });
                return user;
            }
            catch (error) {
                console.error("Error finding user by email:", error);
                return null;
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_model_1.default.findById(id).exec();
        });
    }
    findByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_model_1.default.findOne({ username }).exec();
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_model_1.default.create(user);
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield user_model_1.default.findByIdAndDelete(id).exec();
            return !!result;
        });
    }
}
exports.default = UserRepository;
