import { Order, OrderDocument } from "../models/order.model";
import OrderRepository from "../repositories/order.repository";

class OrderService {
  private orderRepository: OrderRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
  }

  createOrder: (order: OrderDocument) => Promise<Order> = (order) =>
    this.orderRepository.create(order);

  getOrderById: (id: string) => Promise<OrderDocument | null> = (id) =>
    this.orderRepository.findById(id);

  getOrdersByUserId: (userId: string) => Promise<OrderDocument[]> = (userId) =>
    this.orderRepository.findByUserId(userId);
}

export default OrderService;
