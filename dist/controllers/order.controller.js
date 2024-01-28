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
const order_service_1 = __importDefault(require("../services/order.service"));
class OrderController {
    constructor() {
        this.getOrderById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const orderId = req.params.id;
            try {
                const order = yield this.orderService.getOrderById(orderId);
                if (order) {
                    res.status(200).json(order);
                }
                else {
                    res.status(404).json({ error: "Order not found" });
                }
            }
            catch (error) {
                console.error("Error getting order by ID:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
        this.createOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const newOrder = req.body;
            try {
                const createdOrder = yield this.orderService.createOrder(newOrder);
                res.status(201).json(createdOrder);
            }
            catch (error) {
                console.error("Error creating order:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
        this.getOrdersByUserId = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            try {
                const orders = yield this.orderService.getOrdersByUserId(userId);
                res.status(200).json(orders);
            }
            catch (error) {
                console.error("Error getting orders by user ID:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
        this.orderService = new order_service_1.default();
    }
}
exports.default = OrderController;
