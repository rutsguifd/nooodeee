"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const OrderSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    items: [
        {
            productId: { type: String, required: true },
            product: {
                type: {
                    name: { type: String, required: true },
                    price: { type: Number, required: true },
                    description: { type: String, required: true },
                },
                required: true,
            },
            quantity: { type: Number, required: true },
        },
    ],
});
const OrderModel = mongoose_1.default.model("Order", OrderSchema);
exports.default = OrderModel;
