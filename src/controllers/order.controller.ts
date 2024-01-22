import { Request, Response } from "express";
import OrderService from "../services/order.service";

class OrderController {
  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  getOrderById = (req: Request, res: Response): void => {
    const orderId = req.params.id;
    const order = this.orderService.getOrderById(orderId);

    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  };

  getOrdersByUserId = (req: Request, res: Response): void => {
    const userId = req.params.userId;
    const orders = this.orderService.getOrdersByUserId(userId);

    res.status(200).json(orders);
  };

  createOrder = (req: Request, res: Response): void => {
    const newOrder = req.body;
    const createdOrder = this.orderService.createOrder(newOrder);

    res.status(201).json(createdOrder);
  };
}

export default OrderController;
