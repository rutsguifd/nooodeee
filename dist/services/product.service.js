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
const product_repository_1 = __importDefault(require("../repositories/product.repository"));
class ProductService {
    constructor() {
        this.getProductById = (productId) => __awaiter(this, void 0, void 0, function* () {
            return this.productRepository.findById(productId);
        });
        this.getAllProducts = () => __awaiter(this, void 0, void 0, function* () {
            return this.productRepository.findAll();
        });
        this.createProduct = (product) => __awaiter(this, void 0, void 0, function* () {
            return this.productRepository.create(product);
        });
        this.updateProduct = (product) => __awaiter(this, void 0, void 0, function* () {
            const updatedProduct = yield this.productRepository.update(product);
            return updatedProduct;
        });
        this.deleteProduct = (productId) => __awaiter(this, void 0, void 0, function* () {
            return this.productRepository.delete(productId);
        });
        this.productRepository = new product_repository_1.default();
    }
}
exports.default = ProductService;
