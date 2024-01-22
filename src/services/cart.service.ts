import CartRepository from "../repositories/cart.repository";
import Cart from "../models/cart.model";

class CartService {
  private cartRepository: CartRepository;

  constructor() {
    this.cartRepository = new CartRepository();
  }

  getCartById(id: string): Cart | undefined {
    return this.cartRepository.findById(id);
  }

  getUserActiveCart(userId: string): Cart | undefined {
    return this.cartRepository.findByUserId(userId);
  }

  createCart(cart: Cart): Cart {
    return this.cartRepository.create(cart);
  }

  updateCart(cart: Cart): Cart | undefined {
    return this.cartRepository.update(cart);
  }

  softDeleteCart(id: string): boolean {
    return this.cartRepository.softDeleteCart(id);
  }
}

export default CartService;
