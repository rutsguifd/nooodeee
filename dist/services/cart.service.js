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
const cart_repository_1 = __importDefault(require("../repositories/cart.repository"));
class CartService {
    constructor() {
        this.getCartById = (id) => {
            return this.cartRepository.findById(id);
        };
        this.updateCart = (cartId, updatedCart) => {
            return this.cartRepository.update(cartId, updatedCart);
        };
        this.deleteCart = (id) => {
            return this.cartRepository.softDelete(id);
        };
        this.getActiveCartByUserId = (userId) => {
            return this.cartRepository.findByUserId(userId);
        };
        this.cartRepository = new cart_repository_1.default();
    }
    createCart(cart) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdCart = yield this.cartRepository.create(cart);
            return createdCart._id.toString();
        });
    }
    deleteActiveCartByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingCart = yield this.getActiveCartByUserId(userId);
                if (existingCart) {
                    yield this.cartRepository.softDelete(existingCart.id);
                    return true;
                }
                return false;
            }
            catch (error) {
                console.error("Error deleting active cart:", error);
                throw error;
            }
        });
    }
}
exports.default = CartService;
