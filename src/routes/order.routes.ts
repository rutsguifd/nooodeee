import express from "express";
import OrderController from "../controllers/order.controller";

const router = express.Router();
const orderController = new OrderController();

router.get("/api/orders/:id", orderController.getOrderById);
router.get("/api/orders/user/:userId", orderController.getOrdersByUserId);
router.post("/api/orders", orderController.createOrder);

export default router;
