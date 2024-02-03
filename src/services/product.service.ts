import { ProductDocument } from "../models/product.model";
import ProductRepository from "../repositories/product.repository";

class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  getProductById = async (
    productId: string
  ): Promise<ProductDocument | null> => {
    return this.productRepository.findById(productId);
  };

  getAllProducts = async (): Promise<ProductDocument[]> => {
    return this.productRepository.findAll();
  };

  createProduct = async (
    product: ProductDocument
  ): Promise<ProductDocument> => {
    return this.productRepository.create(product);
  };

  updateProduct = async (
    productId: string,
    updatedProductData: Partial<ProductDocument>
  ): Promise<ProductDocument | null> => {
    const existingProduct = await this.productRepository.findById(productId);

    if (!existingProduct) {
      return null;
    }

    const updatedProduct = {
      ...existingProduct.toObject(),
      ...updatedProductData,
    };
    return this.productRepository.update(updatedProduct);
  };

  deleteProduct = async (productId: string): Promise<boolean> => {
    return this.productRepository.delete(productId);
  };
}

export default ProductService;
