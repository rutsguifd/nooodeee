interface CartItem {
  productId: string;
  quantity: number;
}

interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  isDeleted: boolean;
}

export default Cart;
