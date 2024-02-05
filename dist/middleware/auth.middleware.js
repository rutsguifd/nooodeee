"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const adminMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (token) {
        try {
            const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            const userRole = decodedToken.role;
            if (userRole === "ADMIN") {
                next();
            }
            else {
                res.status(403).json({
                    error: "Access Forbidden: Only admins can perform this action.",
                });
            }
        }
        catch (error) {
            res.status(401).json({ error: "Unauthorized: Invalid token." });
        }
    }
    else {
        res.status(401).json({ error: "Unauthorized: Token missing." });
    }
};
exports.default = adminMiddleware;
