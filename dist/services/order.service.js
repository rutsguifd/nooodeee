"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_repository_1 = __importDefault(require("../repositories/order.repository"));
class OrderService {
    constructor() {
        this.createOrder = (order) => this.orderRepository.create(order);
        this.getOrderById = (id) => this.orderRepository.findById(id);
        this.getOrdersByUserId = (userId) => this.orderRepository.findByUserId(userId);
        this.orderRepository = new order_repository_1.default();
    }
}
exports.default = OrderService;
