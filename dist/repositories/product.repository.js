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
const product_model_1 = __importDefault(require("../models/product.model"));
class ProductRepository {
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return product_model_1.default.findById(id).exec();
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield product_model_1.default.find().exec();
            return products;
        });
    }
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            return product_model_1.default.create(product);
        });
    }
    update(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedProduct = yield product_model_1.default.findByIdAndUpdate(product._id, product, { new: true }).exec();
            return updatedProduct;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield product_model_1.default.findByIdAndDelete(id).exec();
            return !!result;
        });
    }
}
exports.default = ProductRepository;
