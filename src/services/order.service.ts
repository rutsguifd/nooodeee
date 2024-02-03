import { ObjectId } from "mongodb";
import { OrderDocument } from "../models/order.model";
import OrderRepository from "../repositories/order.repository";
import ProductService from "../services/product.service"; // Import ProductService to fetch product prices

class OrderService {
  private orderRepository: OrderRepository;
  private productService: ProductService;

  constructor() {
    this.orderRepository = new OrderRepository();
    this.productService = new ProductService(); // Initialize ProductService
  }

  async createOrder(order: OrderDocument): Promise<OrderDocument> {
    const orderWithPrices = await this.calculatePrices(order);
    return this.orderRepository.create(orderWithPrices);
  }

  async calculatePrices(order: OrderDocument): Promise<OrderDocument> {
    const itemsWithPrices = await Promise.all(
      order.items.map(async (item) => {
        const product = await this.productService.getProductById(
          item.productId.toString()
        );
        const productPrice = product?.price;
        const price = productPrice ? productPrice : 0;
        return { ...item, price };
      })
    );

    const total = itemsWithPrices.reduce(
      (acc, curr) => acc + curr.price! * curr.count,
      0
    );

    return { ...order, items: itemsWithPrices, total } as OrderDocument;
  }

  getOrderById(id: string): Promise<OrderDocument | null> {
    return this.orderRepository.findById(id);
  }

  getOrdersByUserId(userId: string): Promise<OrderDocument[]> {
    return this.orderRepository.findByUserId(userId);
  }
}

export default OrderService;
