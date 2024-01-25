import { Request, Response } from "express";
import { Product, ProductDocument } from "../models/product.model";
import ProductService from "../services/product.service";

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
    const newProduct = req.body;

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
    const updatedProductData: Product = req.body;

    const existingProduct = await this.productService.getProductById(productId);

    if (existingProduct) {
      const updatedData = {
        name: updatedProductData.name || existingProduct.name,
        price: updatedProductData.price || existingProduct.price,
        description:
          updatedProductData.description || existingProduct.description,
        id: productId,
      };
      const updatedProduct = await this.productService.updateProduct(
        updatedData as ProductDocument
      );

      if (updatedProduct) {
        console.log(updatedProduct);

        res.status(200).json(updatedProduct);
      } else {
        res.status(500).json({ error: "Failed to update product" });
      }
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  };
}

export default ProductController;
