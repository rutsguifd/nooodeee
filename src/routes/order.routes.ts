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
