interface OrderItem {
  productId: string;
  quantity: number;
  productSnapshot: {
    name: string;
    description: string;
    price: number;
  };
}

interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
}

export default Order;
