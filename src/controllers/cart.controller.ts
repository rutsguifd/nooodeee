import { Request, Response } from "express";
import { CartDocument } from "../models/cart.model";
import { UserDocument } from "../models/user.model";
import CartService from "../services/cart.service";
import UserService from "../services/user.service";

class CartController {
  private cartService: CartService;
  private userService: UserService;

  constructor() {
    this.cartService = new CartService();
    this.userService = new UserService();
  }

  getCartById: (req: Request, res: Response) => Promise<void> = async (
    req: Request,
    res: Response
  ) => {
    const cartId = req.params.id;

    try {
      const cart = await this.cartService.getCartById(cartId);

      if (cart) {
        res.status(200).json(cart);
      } else {
        res.status(404).json({ error: "Cart not found" });
      }
    } catch (error) {
      console.error("Error getting cart by ID:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  createCart: (req: Request, res: Response) => Promise<void> = async (
    req: Request,
    res: Response
  ) => {
    const newCart = req.body;
    const userId = newCart.userId;

    try {
      const existingCart = await this.cartService.getActiveCartByUserId(userId);

      if (existingCart) {
        res.status(200).json(existingCart);
      } else {
        const createdCartId = await this.cartService.createCart(
          newCart as CartDocument
        );

        const updateUser = await this.userService.getUserById(userId);
        await this.userService.updateUser(
          updateUser as UserDocument,
          createdCartId
        );

        res.status(201).json({ cartId: createdCartId });
      }
    } catch (error) {
      console.error("Error creating cart:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  updateCart: (req: Request, res: Response) => Promise<void> = async (
    req: Request,
    res: Response
  ) => {
    const cartId = req.params.id;
    const updatedCart = req.body;

    try {
      const cart = await this.cartService.updateCart({
        ...updatedCart,
        id: cartId,
      });

      if (cart) {
        res.status(200).json(cart);
      } else {
        res.status(404).json({ error: "Cart not found" });
      }
    } catch (error) {
      console.error("Error updating cart:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  DeleteCart: (req: Request, res: Response) => Promise<void> = async (
    req: Request,
    res: Response
  ) => {
    const cartId = req.params.id;

    try {
      const result = await this.cartService.DeleteCart(cartId);

      if (result) {
        res.status(200).json({ message: "Cart soft-deleted successfully" });
      } else {
        res.status(404).json({ error: "Cart not found" });
      }
    } catch (error) {
      console.error("Error soft-deleting cart:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

export default CartController;
