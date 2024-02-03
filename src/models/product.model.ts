import mongoose, { Document, Schema } from "mongoose";

export interface ProductDocument extends Document {
  title: string;
  description: string;
  price: number;
}

const ProductSchema: Schema<ProductDocument> = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

const ProductModel = mongoose.model<ProductDocument>("Product", ProductSchema);

export default ProductModel;
