import Cart from "../models/cart.model";
import cartDatabase from "../db/cart.db";

class CartRepository {
  findById: (id: string) => Cart | undefined = (id: string) => {
    return cartDatabase.find((cart) => cart.id === id);
  };

  findByUserId: (userId: string) => Cart | undefined = (userId: string) => {
    return cartDatabase.find(
      (cart) => cart.userId === userId && !cart.isDeleted
    );
  };

  create: (cart: Cart) => Cart = (cart: Cart) => {
    cartDatabase.push(cart);
    return cart;
  };

  update: (cart: Cart) => Cart | undefined = (cart: Cart) => {
    const index = cartDatabase.findIndex((c) => c.id === cart.id);
    if (index !== -1) {
      cartDatabase[index] = cart;
      return cart;
    }
    return undefined;
  };

  softDeleteCart: (id: string) => boolean = (id: string) => {
    const cart = this.findById(id);
    if (cart) {
      cart.isDeleted = true;
      return true;
    }
    return false;
  };
}

export default CartRepository;
