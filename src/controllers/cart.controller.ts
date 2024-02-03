import { Request, Response } from "express";
import CartService from "../services/cart.service";
import { CartDocument } from "../models/cart.model";

class CartController {
  private cartService: CartService;

  constructor() {
    this.cartService = new CartService();
  }

  getCartById = async (req: Request, res: Response): Promise<void> => {
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

  createCart = async (req: Request, res: Response): Promise<void> => {
    const newCartData: Partial<CartDocument> = req.body;

    try {
      const userId = newCartData.userId;
      if (!userId) {
        res.status(400).json({ error: "userId is required" });
        return;
      }

      await this.cartService.deleteActiveCartByUserId(userId);

      const createdCartId = await this.cartService.createCart(
        newCartData as CartDocument
      );
      res.status(201).json({ cartId: createdCartId });
    } catch (error) {
      console.error("Error creating cart:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  updateCart = async (req: Request, res: Response): Promise<void> => {
    const cartId = req.params.id;
    const updatedCartData: Partial<CartDocument> = req.body;

    try {
      const updatedCart = await this.cartService.updateCart(
        cartId,
        updatedCartData
      );

      if (updatedCart) {
        res.status(200).json(updatedCart);
      } else {
        res.status(404).json({ error: "Cart not found" });
      }
    } catch (error) {
      console.error("Error updating cart:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  deleteCart = async (req: Request, res: Response): Promise<void> => {
    const cartId = req.params.id;

    try {
      const result = await this.cartService.deleteCart(cartId);

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

  getActiveCartByUserId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const userId = req.params.userId;

    try {
      const cart = await this.cartService.getActiveCartByUserId(userId);

      if (cart) {
        res.status(200).json(cart);
      } else {
        res.status(404).json({ error: "Cart not found" });
      }
    } catch (error) {
      console.error("Error getting active cart by user ID:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

export default CartController;
