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
const cart_model_1 = __importDefault(require("../models/cart.model"));
class CartRepository {
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return cart_model_1.default.findById(id).exec();
        });
    }
    findByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return cart_model_1.default.findOne({ userId }).exec();
        });
    }
    create(cart) {
        return __awaiter(this, void 0, void 0, function* () {
            return cart_model_1.default.create(cart);
        });
    }
    update(cartId, updatedCart) {
        return __awaiter(this, void 0, void 0, function* () {
            return cart_model_1.default.findByIdAndUpdate(cartId, updatedCart, {
                new: true,
            }).exec();
        });
    }
    softDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield cart_model_1.default.findByIdAndUpdate(id, {
                isDeleted: true,
            }).exec();
            return !!result;
        });
    }
}
exports.default = CartRepository;
