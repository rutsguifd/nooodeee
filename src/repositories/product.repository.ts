import Product from "../models/product.model";
import productDatabase from "../db/product.db";

interface ProductRepositoryInterface {
  findById: (id: string) => Product | undefined;
  create: (product: Product) => Product;
  update: (product: Product) => Product | undefined;
}

class ProductRepository implements ProductRepositoryInterface {
  findById: (id: string) => Product | undefined = (id: string) => {
    console.log("id", id);
    console.log(productDatabase);

    return productDatabase.find((product) => product.id === id);
  };

  create: (product: Product) => Product = (product: Product) => {
    productDatabase.push(product);
    console.log(productDatabase);
    return product;
  };

  update: (product: Product) => Product | undefined = (product: Product) => {
    const index = productDatabase.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      productDatabase[index] = product;
      return product;
    }
    return undefined;
  };
}

export default ProductRepository;
