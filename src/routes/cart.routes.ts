/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart management
 */

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

import express from "express";
import CartController from "../controllers/cart.controller";
import authenticationMiddleware from "../middleware/authentication.middleware";

const router = express.Router();
const cartController = new CartController();

router.get(
  "/api/user/cart/:cartId",
  authenticationMiddleware,
  cartController.getCartById
);
router.post(
  "/api/user/cart",
  authenticationMiddleware,
  cartController.createCart
);
router.put(
  "/api/user/cart/update",
  authenticationMiddleware,
  cartController.updateCart
);
router.delete(
  "/api/user/cart/delete",
  authenticationMiddleware,
  cartController.DeleteCart
);

export default router;
