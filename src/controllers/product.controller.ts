import { Request, Response } from "express";
import ProductService from "../services/product.service";
import { ProductDocument } from "../models/product.model";

class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  getProductById = async (req: Request, res: Response): Promise<void> => {
    const productId = req.params.id;

    try {
      const product = await this.productService.getProductById(productId);

      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      console.error("Error getting product by ID:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      const products = await this.productService.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      console.error("Error getting all products:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  createProduct = async (req: Request, res: Response): Promise<void> => {
    const newProduct = req.body as ProductDocument;

    try {
      const createdProduct = await this.productService.createProduct(
        newProduct
      );
      res.status(201).json(createdProduct);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  deleteProduct = async (req: Request, res: Response): Promise<void> => {
    const productId = req.params.id;

    try {
      const response = await this.productService.deleteProduct(productId);
      res.status(201).json(response);
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  updateProduct = async (req: Request, res: Response): Promise<void> => {
    const productId = req.params.id;
    const updatedProductData: ProductDocument = req.body;

    try {
      const updatedProduct = await this.productService.updateProduct(
        productId,
        updatedProductData
      );

      if (updatedProduct) {
        res.status(200).json(updatedProduct);
      } else {
        res.status(500).json({ error: "Failed to update product" });
      }
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

export default ProductController;
