import mongoose, { Document, Schema } from "mongoose";
import { CartItem } from "./cart.model";

type ORDER_STATUS = "created" | "completed";

interface OrderItem extends CartItem {
  price?: number;
}

export interface OrderDocument extends Document {
  userId: Schema.Types.ObjectId;
  cartId: Schema.Types.ObjectId;
  items: OrderItem[];
  payment: {
    type: string;
    address?: any;
    creditCard?: any;
  };
  delivery: {
    type: string;
    address: any;
  };
  comments: string;
  status: ORDER_STATUS;
  total: number;
}

const OrderSchema: Schema<OrderDocument> = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  cartId: { type: Schema.Types.ObjectId, required: true },
  items: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "Product" },
      count: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  payment: {
    type: { type: String, required: true },
    address: { type: Schema.Types.Mixed },
    creditCard: { type: Schema.Types.Mixed },
  },
  delivery: {
    type: { type: String, required: true },
    address: { type: Schema.Types.Mixed },
  },
  comments: { type: String },
  status: { type: String, enum: ["created", "completed"], required: true },
  total: { type: Number, required: true },
});

const OrderModel = mongoose.model<OrderDocument>("Order", OrderSchema);

export default OrderModel;
