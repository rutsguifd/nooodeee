"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const router = express_1.default.Router();
const productController = new product_controller_1.default();
router.get("/api/products/:id", productController.getProductById);
router.get("/api/products", productController.getAllProducts);
router.post("/api/products", auth_middleware_1.default, productController.createProduct);
router.put("/api/products/:id", auth_middleware_1.default, productController.updateProduct);
router.delete("/api/products/:id", auth_middleware_1.default, productController.deleteProduct);
exports.default = router;
