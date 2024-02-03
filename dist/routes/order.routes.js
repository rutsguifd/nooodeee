"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = __importDefault(require("../controllers/order.controller"));
const router = express_1.default.Router();
const orderController = new order_controller_1.default();
router.get("/api/orders/:id", orderController.getOrderById);
router.get("/api/orders/user/:userId", orderController.getOrdersByUserId);
router.post("/api/orders", orderController.createOrder);
exports.default = router;
