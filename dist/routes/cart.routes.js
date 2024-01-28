"use strict";
/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart management
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @swagger
 * /api/user/cart/{cartId}:
 *   get:
 *     summary: Get cart by ID
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         description: Cart ID
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Internal Server Error
 */
/**
 * @swagger
 * /api/user/cart:
 *   post:
 *     summary: Create a new cart
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Updated cart data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/CartInput'
 *     responses:
 *       201:
 *         description: Cart created successfully
 *       500:
 *         description: Internal Server Error
 */
/**
 * @swagger
 * /api/user/cart/update:
 *   put:
 *     summary: Update cart
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Updated cart data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/CartInput'
 *     responses:
 *       200:
 *         description: Cart updated successfully
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Internal Server Error
 */
/**
 * @swagger
 * /api/user/cart/delete:
 *   delete:
 *     summary: Soft delete cart
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Cart soft-deleted successfully
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Internal Server Error
 */
/**

/**
 * @swagger
 * definitions:
 *   CartItem:
 *     type: object
 *     properties:
 *       productId:
 *         type: string
 *         description: Product ID in the cart
 *       quantity:
 *         type: integer
 *         description: Quantity of the product in the cart
 *     required:
 *       - productId
 *       - quantity
 *
 *   CartInput:
 *     type: object
 *     properties:
 *       userId:
 *         type: string
 *         description: User ID associated with the cart
 *       items:
 *         type: array
 *         items:
 *           $ref: '#/definitions/CartItem'
 *         description: List of items in the cart
 *     required:
 *       - userId
 *       - items
 *
 *   CartOutput:
 *     allOf:
 *       - $ref: '#/definitions/CartInput'
 *       - type: object
 *         description: Output representation of a cart
 *
 *   Cart:
 *     allOf:
 *       - $ref: '#/definitions/CartInput'
 *       - $ref: '#/definitions/CartOutput'
 */
const express_1 = __importDefault(require("express"));
const cart_controller_1 = __importDefault(require("../controllers/cart.controller"));
const authentication_middleware_1 = require("../middleware/authentication.middleware");
const router = express_1.default.Router();
const cartController = new cart_controller_1.default();
router.get("/api/user/cart/:cartId", authentication_middleware_1.authenticationMiddleware, cartController.getCartById);
router.post("/api/user/cart", authentication_middleware_1.authenticationMiddleware, cartController.createCart);
router.put("/api/user/cart/update", authentication_middleware_1.authenticationMiddleware, cartController.updateCart);
router.delete("/api/user/cart/delete", authentication_middleware_1.authenticationMiddleware, authentication_middleware_1.adminAuthorizationMiddleware, cartController.DeleteCart);
exports.default = router;
