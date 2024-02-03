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
const order_repository_1 = __importDefault(require("../repositories/order.repository"));
const product_service_1 = __importDefault(require("../services/product.service")); // Import ProductService to fetch product prices
class OrderService {
    constructor() {
        this.orderRepository = new order_repository_1.default();
        this.productService = new product_service_1.default(); // Initialize ProductService
    }
    createOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderWithPrices = yield this.calculatePrices(order);
            return this.orderRepository.create(orderWithPrices);
        });
    }
    calculatePrices(order) {
        return __awaiter(this, void 0, void 0, function* () {
            const itemsWithPrices = yield Promise.all(order.items.map((item) => __awaiter(this, void 0, void 0, function* () {
                const product = yield this.productService.getProductById(item.productId.toString());
                const productPrice = product === null || product === void 0 ? void 0 : product.price;
                const price = productPrice ? productPrice : 0;
                return Object.assign(Object.assign({}, item), { price });
            })));
            const total = itemsWithPrices.reduce((acc, curr) => acc + curr.price * curr.count, 0);
            return Object.assign(Object.assign({}, order), { items: itemsWithPrices, total });
        });
    }
    getOrderById(id) {
        return this.orderRepository.findById(id);
    }
    getOrdersByUserId(userId) {
        return this.orderRepository.findByUserId(userId);
    }
}
exports.default = OrderService;
