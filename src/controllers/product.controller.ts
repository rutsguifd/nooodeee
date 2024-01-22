import { Request, Response } from "express";
import ProductService from "../services/product.service";

class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  getProductById = (req: Request, res: Response): void => {
    const productId = req.params.id;
    const product = this.productService.getProductById(productId);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  };

  createProduct = (req: Request, res: Response): void => {
    const newProduct = req.body;
    const createdProduct = this.productService.createProduct(newProduct);

    res.status(201).json(createdProduct);
  };

  updateProduct = (req: Request, res: Response): void => {
    const productId = req.params.id;
    const updatedProduct = req.body;

    const existingProduct = this.productService.getProductById(productId);

    if (existingProduct) {
      const result = this.productService.updateProduct({
        ...existingProduct,
        ...updatedProduct,
      });
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(500).json({ error: "Failed to update product" });
      }
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  };
}

export default ProductController;
