import CartModel, { CartDocument } from "../models/cart.model";

interface CartRepositoryInterface {
  findById(id: string): Promise<CartDocument | null>;
  findByUserId(userId: string): Promise<CartDocument | null>;
  create(cart: CartDocument): Promise<CartDocument>;
  update(cart: CartDocument): Promise<CartDocument | null>;
  delete(id: string): Promise<boolean>;
}

class CartRepository implements CartRepositoryInterface {
  async findById(id: string): Promise<CartDocument | null> {
    return CartModel.findById(id).exec();
  }

  async findByUserId(userId: string): Promise<CartDocument | null> {
    return CartModel.findOne({ userId }).exec();
  }

  async create(cart: CartDocument): Promise<CartDocument> {
    return CartModel.create(cart);
  }

  async update(cart: CartDocument): Promise<CartDocument | null> {
    return CartModel.findByIdAndUpdate(cart.id, cart, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await CartModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}

export default CartRepository;
