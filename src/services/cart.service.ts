import { CartDocument } from "../models/cart.model";
import CartRepository from "../repositories/cart.repository";

class CartService {
  private cartRepository: CartRepository;

  constructor() {
    this.cartRepository = new CartRepository();
  }

  async createCart(cart: CartDocument): Promise<string> {
    const createdCart = await this.cartRepository.create(cart);
    return createdCart._id.toString();
  }

  getCartById: (id: string) => Promise<CartDocument | null> = (id: string) => {
    return this.cartRepository.findById(id);
  };

  updateCart: (
    cartId: string,
    updatedCart: Partial<CartDocument>
  ) => Promise<CartDocument | null> = (
    cartId: string,
    updatedCart: Partial<CartDocument>
  ) => {
    return this.cartRepository.update(cartId, updatedCart);
  };

  deleteCart: (id: string) => Promise<boolean> = (id: string) => {
    return this.cartRepository.softDelete(id);
  };

  async deleteActiveCartByUserId(userId: string): Promise<boolean> {
    try {
      const existingCart = await this.getActiveCartByUserId(userId);

      if (existingCart) {
        await this.cartRepository.softDelete(existingCart.id);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error deleting active cart:", error);
      throw error;
    }
  }

  getActiveCartByUserId: (userId: string) => Promise<CartDocument | null> = (
    userId: string
  ) => {
    return this.cartRepository.findByUserId(userId);
  };
}

export default CartService;
