/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Order management
 */

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Order ID
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/orders/user/{userId}:
 *   get:
 *     summary: Get orders by user ID
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Orders not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Order]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Order data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/OrderInput'
 *     responses:
 *       201:
 *         description: Order created successfully
 *       500:
 *         description: Internal Server Error
 */

/**
/**
 * @swagger
 * definitions:
 *   OrderItemInput:
 *     type: object
 *     properties:
 *       productId:
 *         type: string
 *         description: Product ID associated with the order item
 *       product:
 *         type: object
 *         properties:
 *           name:
 *             type: string
 *             description: Product name
 *           price:
 *             type: number
 *             description: Product price
 *           description:
 *             type: string
 *             description: Product description
 *         required:
 *           - name
 *           - price
 *           - description
 *       quantity:
 *         type: integer
 *         description: Quantity of the product in the order item
 *     required:
 *       - productId
 *       - product
 *       - quantity
 *
 *   OrderInput:
 *     type: object
 *     properties:
 *       userId:
 *         type: string
 *         description: User ID associated with the order
 *       items:
 *         type: array
 *         description: Array of order items
 *         items:
 *           $ref: '#/definitions/OrderItemInput'
 *     required:
 *       - userId
 *       - items
 */

import express from "express";
import OrderController from "../controllers/order.controller";
import authenticationMiddleware from "../middleware/authentication.middleware";

const router = express.Router();
const orderController = new OrderController();

router.get(
  "/api/orders/:id",
  authenticationMiddleware,
  orderController.getOrderById
);
router.get(
  "/api/orders/user/:userId",
  authenticationMiddleware,
  orderController.getOrdersByUserId
);
router.post(
  "/api/orders",
  authenticationMiddleware,
  orderController.createOrder
);

export default router;
