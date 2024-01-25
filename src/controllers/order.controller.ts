import { Request, Response } from "express";
import OrderService from "../services/order.service";

class OrderController {
  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  getOrderById: (req: Request, res: Response) => Promise<void> = async (
    req,
    res
  ) => {
    const orderId = req.params.id;

    try {
      const order = await this.orderService.getOrderById(orderId);

      if (order) {
        res.status(200).json(order);
      } else {
        res.status(404).json({ error: "Order not found" });
      }
    } catch (error) {
      console.error("Error getting order by ID:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  createOrder: (req: Request, res: Response) => Promise<void> = async (
    req,
    res
  ) => {
    const newOrder = req.body;

    try {
      const createdOrder = await this.orderService.createOrder(newOrder);
      res.status(201).json(createdOrder);
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  getOrdersByUserId: (req: Request, res: Response) => Promise<void> = async (
    req,
    res
  ) => {
    const userId = req.params.userId;

    try {
      const orders = await this.orderService.getOrdersByUserId(userId);
      res.status(200).json(orders);
    } catch (error) {
      console.error("Error getting orders by user ID:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

export default OrderController;
