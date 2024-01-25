import OrderModel, { OrderDocument } from "../models/order.model";

interface OrderRepositoryInterface {
  findById(id: string): Promise<OrderDocument | null>;
  findByUserId(userId: string): Promise<OrderDocument[]>;
  create(order: OrderDocument): Promise<OrderDocument>;
}

class OrderRepository implements OrderRepositoryInterface {
  async findById(id: string): Promise<OrderDocument | null> {
    return OrderModel.findById(id).exec();
  }

  async findByUserId(userId: string): Promise<OrderDocument[]> {
    return OrderModel.find({ userId }).exec();
  }

  async create(order: OrderDocument): Promise<OrderDocument> {
    return OrderModel.create(order);
  }
}

export default OrderRepository;
