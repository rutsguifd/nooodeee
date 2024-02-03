"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_service_1 = __importDefault(require("../services/product.service"));
class ProductController {
    constructor() {
        this.getProductById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const productId = req.params.id;
            try {
                const product = yield this.productService.getProductById(productId);
                if (product) {
                    res.status(200).json(product);
                }
                else {
                    res.status(404).json({ error: "Product not found" });
                }
            }
            catch (error) {
                console.error("Error getting product by ID:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
        this.getAllProducts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.productService.getAllProducts();
                res.status(200).json(products);
            }
            catch (error) {
                console.error("Error getting all products:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
        this.createProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const newProduct = req.body;
            try {
                const createdProduct = yield this.productService.createProduct(newProduct);
                res.status(201).json(createdProduct);
            }
            catch (error) {
                console.error("Error creating product:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
        this.deleteProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const productId = req.params.id;
            try {
                const response = yield this.productService.deleteProduct(productId);
                res.status(201).json(response);
            }
            catch (error) {
                console.error("Error deleting product:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
        this.updateProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const productId = req.params.id;
            const updatedProductData = req.body;
            try {
                const updatedProduct = yield this.productService.updateProduct(productId, updatedProductData);
                if (updatedProduct) {
                    res.status(200).json(updatedProduct);
                }
                else {
                    res.status(500).json({ error: "Failed to update product" });
                }
            }
            catch (error) {
                console.error("Error updating product:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
        this.productService = new product_service_1.default();
    }
}
exports.default = ProductController;
