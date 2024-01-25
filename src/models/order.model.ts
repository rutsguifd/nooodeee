import mongoose, { Document, Schema } from "mongoose";

export interface OrderItem {
  productId: string;
  product: { name: string; price: number; description: string };
  quantity: number;
}

export interface Order {
  userId: string;
  items: OrderItem[];
}

export interface OrderDocument extends Document, Order {}

export interface Order {
  userId: string;
  items: OrderItem[];
}

export interface OrderDocument extends Document, Order {}

const OrderSchema: Schema<OrderDocument> = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [
    {
      productId: { type: String, required: true },
      product: {
        type: {
          name: { type: String, required: true },
          price: { type: Number, required: true },
          description: { type: String, required: true },
        },
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
});

const OrderModel = mongoose.model<OrderDocument>("Order", OrderSchema);

export default OrderModel;
