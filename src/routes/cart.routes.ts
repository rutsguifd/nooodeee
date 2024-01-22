import express from "express";
import CartController from "../controllers/cart.controller";
import authenticationMiddleware from "../middleware/authentication.middleware";

const router = express.Router();
const cartController = new CartController();

router.get(
  "/api/carts/:id",
  authenticationMiddleware,
  cartController.getCartById
);
router.get(
  "/api/carts/user/:userId",
  authenticationMiddleware,
  cartController.getUserActiveCart
);
router.post("/api/carts", authenticationMiddleware, cartController.createCart);
router.put(
  "/api/carts/:id",
  authenticationMiddleware,
  cartController.updateCart
);
router.delete(
  "/api/carts/:id",
  authenticationMiddleware,
  cartController.softDeleteCart
);

export default router;
