import ProductModel, {
  Product,
  ProductDocument,
} from "../models/product.model";

interface ProductRepositoryInterface {
  findById(id: string): Promise<ProductDocument | null>;
  create(product: ProductDocument): Promise<ProductDocument>;
  update(product: ProductDocument): Promise<ProductDocument | null>;
  delete(id: string): Promise<boolean>;
}

class ProductRepository implements ProductRepositoryInterface {
  async findById(id: string): Promise<ProductDocument | null> {
    return ProductModel.findById(id).exec();
  }

  async findAll(): Promise<Product[]> {
    const products = await ProductModel.find().exec();
    return products;
  }

  async create(product: ProductDocument): Promise<ProductDocument> {
    return ProductModel.create(product);
  }

  async update(product: ProductDocument): Promise<ProductDocument | null> {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      product.id,
      product,
      {
        new: true,
      }
    ).exec();
    return updatedProduct;
  }

  async delete(id: string): Promise<boolean> {
    const result = await ProductModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}

export default ProductRepository;
