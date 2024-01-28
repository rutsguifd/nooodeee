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
const cart_service_1 = __importDefault(require("../services/cart.service"));
const user_service_1 = __importDefault(require("../services/user.service"));
class CartController {
    constructor() {
        this.getCartById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const cartId = req.params.id;
            try {
                const cart = yield this.cartService.getCartById(cartId);
                if (cart) {
                    res.status(200).json(cart);
                }
                else {
                    res.status(404).json({ error: "Cart not found" });
                }
            }
            catch (error) {
                console.error("Error getting cart by ID:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
        this.createCart = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const newCart = req.body;
            const userId = newCart.userId;
            try {
                const existingCart = yield this.cartService.getActiveCartByUserId(userId);
                if (existingCart) {
                    res.status(200).json(existingCart);
                }
                else {
                    const createdCartId = yield this.cartService.createCart(newCart);
                    const updateUser = yield this.userService.getUserById(userId);
                    yield this.userService.updateUser(updateUser, createdCartId);
                    res.status(201).json({ cartId: createdCartId });
                }
            }
            catch (error) {
                console.error("Error creating cart:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
        this.updateCart = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const cartId = req.params.id;
            const updatedCart = req.body;
            try {
                const cart = yield this.cartService.updateCart(Object.assign(Object.assign({}, updatedCart), { id: cartId }));
                if (cart) {
                    res.status(200).json(cart);
                }
                else {
                    res.status(404).json({ error: "Cart not found" });
                }
            }
            catch (error) {
                console.error("Error updating cart:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
        this.DeleteCart = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const cartId = req.params.id;
            try {
                const result = yield this.cartService.DeleteCart(cartId);
                if (result) {
                    res.status(200).json({ message: "Cart soft-deleted successfully" });
                }
                else {
                    res.status(404).json({ error: "Cart not found" });
                }
            }
            catch (error) {
                console.error("Error soft-deleting cart:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
        this.cartService = new cart_service_1.default();
        this.userService = new user_service_1.default();
    }
}
exports.default = CartController;
