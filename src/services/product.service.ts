import ProductRepository from "../repositories/product.repository";
import Product from "../models/product.model";

class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  getProductById(id: string): Product | undefined {
    return this.productRepository.findById(id);
  }

  createProduct(product: Product): Product {
    return this.productRepository.create(product);
  }

  updateProduct(product: Product): Product | undefined {
    return this.productRepository.update(product);
  }
}

export default ProductService;
