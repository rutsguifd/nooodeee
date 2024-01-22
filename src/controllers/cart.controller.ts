import { Request, Response } from "express";
import CartService from "../services/cart.service";

class CartController {
  private cartService: CartService;

  constructor() {
    this.cartService = new CartService();
  }

  getCartById = (req: Request, res: Response): void => {
    const cartId = req.params.id;
    const cart = this.cartService.getCartById(cartId);

    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ error: "Cart not found" });
    }
  };

  getUserActiveCart = (req: Request, res: Response): void => {
    const userId = req.params.userId;
    const cart = this.cartService.getUserActiveCart(userId);

    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ error: "Active cart not found for the user" });
    }
  };

  createCart = (req: Request, res: Response): void => {
    const newCart = req.body;
    const createdCart = this.cartService.createCart(newCart);

    res.status(201).json(createdCart);
  };

  updateCart = (req: Request, res: Response): void => {
    const cartId = req.params.id;
    const updatedCart = req.body;

    const existingCart = this.cartService.getCartById(cartId);

    if (existingCart) {
      const result = this.cartService.updateCart({
        ...existingCart,
        ...updatedCart,
      });
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(500).json({ error: "Failed to update cart" });
      }
    } else {
      res.status(404).json({ error: "Cart not found" });
    }
  };

  softDeleteCart = (req: Request, res: Response): void => {
    const cartId = req.params.id;

    if (this.cartService.softDeleteCart(cartId)) {
      res.status(200).json({ message: "Cart soft-deleted successfully" });
    } else {
      res.status(404).json({ error: "Cart not found" });
    }
  };
}

export default CartController;
