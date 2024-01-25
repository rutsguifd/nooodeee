import { Product, ProductDocument } from "../models/product.model";
import ProductRepository from "../repositories/product.repository";

class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  getProductById = async (productId: string): Promise<Product | null> => {
    return this.productRepository.findById(productId);
  };

  getAllProducts = async (): Promise<Product[]> => {
    return this.productRepository.findAll();
  };

  createProduct = async (product: ProductDocument): Promise<Product> => {
    return this.productRepository.create(product);
  };

  updateProduct = async (product: ProductDocument): Promise<Product | null> => {
    const updatedProduct = await this.productRepository.update(product);
    return updatedProduct;
  };

  deleteProduct = async (productId: string): Promise<boolean> => {
    return this.productRepository.delete(productId);
  };
}

export default ProductService;
