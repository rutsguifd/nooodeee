import mongoose, { Document, Schema } from "mongoose";
import { ProductDocument } from "./product.model";

export interface CartDocument extends Document {
  userId: string;
  isDeleted: boolean;
  items: CartItem[];
}

export interface CartItem {
  productId: Schema.Types.ObjectId;
  count: number;
}

const CartSchema: Schema<CartDocument> = new mongoose.Schema({
  userId: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
  items: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "Product" },
      count: Number,
    },
  ],
});

const CartModel = mongoose.model<CartDocument>("Cart", CartSchema);

export default CartModel;
