import mongoose, { Document, Schema } from "mongoose";

export interface Product {
  name: string;
  description: string;
  price: number;
}

export interface ProductDocument extends Document, Product {}

const ProductSchema: Schema<ProductDocument> = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

const ProductModel = mongoose.model<ProductDocument>("Product", ProductSchema);

export default ProductModel;
