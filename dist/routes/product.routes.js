"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const router = express_1.default.Router();
const productController = new product_controller_1.default();
router.get("/api/products/:id", productController.getProductById);
router.get("/api/products", productController.getAllProducts);
router.post("/api/products", productController.createProduct);
router.put("/api/products/:id", productController.updateProduct);
router.delete("/api/products/:id", productController.deleteProduct);
exports.default = router;
