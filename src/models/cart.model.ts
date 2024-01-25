import mongoose, { Document, Schema } from "mongoose";

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Cart {
  userId: string;
  items: CartItem[];
}

export interface CartDocument extends Document, Cart {}

const CartSchema: Schema<CartDocument> = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
});

const CartModel = mongoose.model<CartDocument>("Cart", CartSchema);

export default CartModel;
