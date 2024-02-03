import express from "express";
import ProductController from "../controllers/product.controller";

const router = express.Router();
const productController = new ProductController();

router.get("/api/products/:id", productController.getProductById);
router.get("/api/products", productController.getAllProducts);
router.post("/api/products", productController.createProduct);
router.put("/api/products/:id", productController.updateProduct);
router.delete("/api/products/:id", productController.deleteProduct);

export default router;
