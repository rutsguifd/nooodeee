import { CartDocument } from "../models/cart.model";
import CartRepository from "../repositories/cart.repository";
import UserService from "./user.service";

class CartService {
  private cartRepository: CartRepository;
  private userService: UserService;

  constructor() {
    this.cartRepository = new CartRepository();
    this.userService = new UserService();
  }

  async createCart(cart: CartDocument): Promise<string> {
    const createdCart = await this.cartRepository.create(cart);
    return createdCart._id.toString();
  }

  getCartById: (id: string) => Promise<CartDocument | null> = (id: string) => {
    return this.cartRepository.findById(id);
  };

  updateCart: (cart: CartDocument) => Promise<CartDocument | null> = (
    cart: CartDocument
  ) => {
    return this.cartRepository.update(cart);
  };

  DeleteCart: (id: string) => Promise<boolean> = (id: string) => {
    return this.cartRepository.delete(id);
  };

  getActiveCartByUserId: (userId: string) => Promise<CartDocument | null> = (
    userId: string
  ) => {
    return this.cartRepository.findByUserId(userId);
  };
}

export default CartService;
