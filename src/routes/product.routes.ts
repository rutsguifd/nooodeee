import express from "express";
import ProductController from "../controllers/product.controller";
import authenticationMiddleware from "../middleware/authentication.middleware";

const router = express.Router();
const productController = new ProductController();

router.get(
  "/api/products/:id",
  authenticationMiddleware,
  productController.getProductById
);
router.post(
  "/api/products",
  authenticationMiddleware,
  productController.createProduct
);
router.put(
  "/api/products/:id",
  authenticationMiddleware,
  productController.updateProduct
);

export default router;
