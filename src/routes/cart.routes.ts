import express from "express";
import CartController from "../controllers/cart.controller";

const router = express.Router();
const cartController = new CartController();

router.get("/api/cart/:id", cartController.getCartById);
router.get("/api/cart/user/:userId", cartController.getActiveCartByUserId);
router.post("/api/cart", cartController.createCart);
router.put("/api/cart/:id", cartController.updateCart);
router.delete("/api/cart/:id", cartController.deleteCart);

export default router;
