import express from "express";
import ProductController from "../controllers/product.controller";
import adminMiddleware from "../middleware/auth.middleware";

const router = express.Router();
const productController = new ProductController();

router.get("/api/products/:id", productController.getProductById);
router.get("/api/products", productController.getAllProducts);
router.post("/api/products", adminMiddleware, productController.createProduct);
router.put(
  "/api/products/:id",
  adminMiddleware,
  productController.updateProduct
);
router.delete(
  "/api/products/:id",
  adminMiddleware,
  productController.deleteProduct
);

export default router;
