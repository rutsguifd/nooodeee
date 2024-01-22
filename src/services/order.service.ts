import OrderRepository from "../repositories/order.repository";
import Order from "../models/order.model";

class OrderService {
  private orderRepository: OrderRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
  }

  getOrderById(id: string): Order | undefined {
    return this.orderRepository.findById(id);
  }

  getOrdersByUserId(userId: string): Order[] {
    return this.orderRepository.findByUserId(userId);
  }

  createOrder(order: Order): Order {
    return this.orderRepository.create(order);
  }
}

export default OrderService;
