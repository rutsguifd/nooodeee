"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_controller_1 = __importDefault(require("../controllers/cart.controller"));
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const router = express_1.default.Router();
const cartController = new cart_controller_1.default();
router.get("/api/cart/:id", cartController.getCartById);
router.get("/api/cart/user/:userId", cartController.getActiveCartByUserId);
router.post("/api/cart", cartController.createCart);
router.put("/api/cart/:id", cartController.updateCart);
router.delete("/api/cart/:id", auth_middleware_1.default, cartController.deleteCart);
exports.default = router;
