import CartModel, { CartDocument } from "../models/cart.model";

interface CartRepositoryInterface {
  findById(id: string): Promise<CartDocument | null>;
  findByUserId(userId: string): Promise<CartDocument | null>;
  create(cart: CartDocument): Promise<CartDocument>;
  update(cartId: string, cart: CartDocument): Promise<CartDocument | null>;
  softDelete(id: string): Promise<boolean>;
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

  async update(
    cartId: string,
    updatedCart: Partial<CartDocument>
  ): Promise<CartDocument | null> {
    return CartModel.findByIdAndUpdate(cartId, updatedCart, {
      new: true,
    }).exec();
  }

  async softDelete(id: string): Promise<boolean> {
    const result = await CartModel.findByIdAndUpdate(id, {
      isDeleted: true,
    }).exec();
    return !!result;
  }
}

export default CartRepository;
