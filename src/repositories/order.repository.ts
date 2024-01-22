import Order from "../models/order.model";
import orderDatabase from "../db/order.db";

class OrderRepository {
  findById: (id: string) => Order | undefined = (id: string) => {
    return orderDatabase.find((order) => order.id === id);
  };

  findByUserId: (userId: string) => Order[] = (userId: string) => {
    return orderDatabase.filter((order) => order.userId === userId);
  };

  create: (order: Order) => Order = (order: Order) => {
    orderDatabase.push(order);
    return order;
  };
}

export default OrderRepository;
