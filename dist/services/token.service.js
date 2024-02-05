"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TokenService {
    static generateToken(id, email, role) {
        return jsonwebtoken_1.default.sign({ id, email, role }, process.env.JWT_SECRET, {
            expiresIn: "4h",
        });
    }
    static validateToken(token) {
        try {
            const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            return decodedToken;
        }
        catch (error) {
            console.error("Error validating token:", error);
            return null;
        }
    }
    static refreshToken(token) {
        const decodedToken = TokenService.validateToken(token);
        if (!decodedToken)
            return null;
        return TokenService.generateToken(decodedToken.id, decodedToken.email, decodedToken.role);
    }
}
exports.default = TokenService;
