"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuthorizationMiddleware = exports.authenticationMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = "your-secret-key";
const authenticationMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).json({ error: "Unauthorized: Missing token" });
        return;
    }
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = decodedToken;
        next();
    }
    catch (error) {
        console.error("Error verifying token:", error);
        res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
};
exports.authenticationMiddleware = authenticationMiddleware;
const adminAuthorizationMiddleware = (req, res, next) => {
    var _a;
    const userRole = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
    if (userRole !== "admin") {
        res.status(403).json({
            error: "Forbidden: Only admin users are allowed to perform this action",
        });
        return;
    }
    next();
};
exports.adminAuthorizationMiddleware = adminAuthorizationMiddleware;
